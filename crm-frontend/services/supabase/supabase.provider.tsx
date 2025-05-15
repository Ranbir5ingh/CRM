"use client";
import React, { useState } from "react";
import { SupabaseContext } from "./supbase.context";
import { useQuery } from "@tanstack/react-query";
import { SupabaseAuthClient } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";
import { useAxios } from "../axios/axios.hook";
import { AxiosError } from "axios";

const createClient = new SupabaseAuthClient();

export function SupabaseNewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [retryAttempts, setRetryAttempts] = useState(0);
  const { axios } = useAxios();

  const {
    data: { supabase, session } = {},
    isFetching: isloading,
    refetch: refetchClient,
  } = useQuery({
    queryKey: ["supabase", "session"],
    queryFn: async () => {
      const client = createClient.getBrowserclient();
      const supabase = client;
      const { data } = (await supabase?.auth.getSession()) ?? {};
      return { session: data.session as Session, supabase };
    },
  });

  if (session?.access_token) {
    axios.interceptors.request.use(async (config) => {
      const client = createClient.getBrowserclient();
      const { data } = await client.auth.getSession();
      const token = data?.session?.access_token;
      if (token) {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
    axios.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error: AxiosError) => {
        if (error.response) {
          const statusCode = error.response.status;
          // If 401 is encountered, refresh the session and retry the request
          if (statusCode === 401 && retryAttempts < 4) {
            const newToken = await refetch();

            if (newToken) {
              axios.defaults.headers["Authorization"] = `Bearer ${newToken}`;

              // Retry the original request with the new token
              setRetryAttempts((prev) => prev + 1);
              if (error.config) {
                return axios(error.config);
              }
            }
          }

          // For other HTTP errors (non-401), handle custom error logic
          const customErrorMessage =
            (error.response?.data as { meta?: { message?: string } })?.meta
              ?.message ?? error.message;
          throw new AxiosError(customErrorMessage);
        }

        // If there's no response from the server (network error or similar), throw a generic error
        throw error;
      }
    );
  }

  const refetch = async () => {
    if (supabase) {
      await refetchClient();
      const { data } = await supabase.auth.refreshSession();
      return data?.session?.access_token;
    }
  };
  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut({
        scope: "global",
      });
      await refetch();
    }
  };

  return (
    <SupabaseContext.Provider
      value={{
        session: session,
        supabase: supabase!,
        isLoading: isloading,
        logout,
        refreshSession: refetch,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
}
