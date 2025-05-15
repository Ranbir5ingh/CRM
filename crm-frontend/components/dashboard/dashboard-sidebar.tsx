"use client";

import { useState, useEffect } from "react";
import type React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  Car,
  FileText,
  CreditCard,
  Settings,
  Map,
  CheckSquare,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSupabase } from "@/services/supabase/supabase.hook";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { toast } = useToast();
  const router = useRouter();
  const { logout } = useSupabase();

  // Track window size to determine if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1023);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const routes: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/customers", label: "Customers", icon: Users },
    { href: "/dashboard/vehicles", label: "Vehicles", icon: Car },
    { href: "/dashboard/rentals", label: "Rentals", icon: FileText },
    { href: "/dashboard/finance", label: "Finance", icon: CreditCard },
    // { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await logout();

      toast({
        title: "Signed out successfully",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again.",
      });
    }
  };

  const handleNavigation = () => {
    // Close sidebar on mobile when navigating
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Car className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">VehicleCRM</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3 py-4">
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href} className="py-1">
                <SidebarMenuButton
                  asChild
                  isActive={pathname === route.href}
                  tooltip={route.label}
                  className={`rounded-lg transition-colors hover:bg-accent ${
                    pathname === route.href
                      ? "bg-accent/80 text-accent-foreground"
                      : "bg-transparent"
                  }`}
                >
                  <Link
                    href={route.href}
                    className="flex items-center gap-3 px-4 py-3"
                    onClick={handleNavigation}
                  >
                    <route.icon className="h-5 w-5" />
                    <span className="font-medium">{route.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="px-3 py-4 border-t mt-auto">
          <SidebarMenu>
            <SidebarMenuItem className="py-1">
              <SidebarMenuButton asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-lg px-4 py-3 hover:bg-accent"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span className="font-medium">Sign out</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-1">
              <SidebarMenuButton asChild>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Admin User</span>
                    <span className="text-xs text-muted-foreground">
                      admin@example.com
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="w-full overflow-hidden flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6 fixed top-0 z-10 w-full">
          <SidebarTrigger className="rounded-md hover:bg-accent p-2" />
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">VehicleCRM</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
      </>
  );
}