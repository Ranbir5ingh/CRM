"use client";
import type React from "react";
import { useSupabase } from "@/services/supabase/supabase.hook";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = useSupabase();
  const router = useRouter();
  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session]);

  return <>{children};</>;
}
