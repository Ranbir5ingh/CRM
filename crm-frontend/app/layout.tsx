import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastContainer } from "react-toastify";
import { SupabaseNewProvider } from "@/services/supabase/supabase.provider";
import { AxiosProvider } from "@/services/axios/axios.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VehicleCRM - Vehicle Rental Management System",
  description: "A modern CRM system for vehicle rental management",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
      <ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover
					theme="colored"
				/>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AxiosProvider>
              <SupabaseNewProvider>
                {/* <SupabaseProvider> */}
                {children}
                {/* </SupabaseProvider> */}
              </SupabaseNewProvider>
            </AxiosProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
