"use client"
import React from "react";
import { SupabaseContextType } from "./supabase.types";

export const SupabaseContext = React.createContext<
  SupabaseContextType | undefined
>(undefined);
