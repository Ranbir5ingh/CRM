"use client";

import { useSupabase } from "@/services/supabase/supabase.hook";
import React from "react";

export default function dashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  return <div>dashboard.provider</div>;
}
