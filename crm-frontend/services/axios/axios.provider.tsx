"use client";
import React from "react";
import { AxiosContext } from "./axios.context";
import axios from "axios";
import { AxiosUrls } from "./axiox.constant";

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  const [urltype, seturltype] = React.useState(0);

  const axiosInstance = axios.create({
    baseURL: AxiosUrls[urltype].url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return (
    <AxiosContext.Provider value={{ axios: axiosInstance }}>
      {children}
    </AxiosContext.Provider>
  );
};
