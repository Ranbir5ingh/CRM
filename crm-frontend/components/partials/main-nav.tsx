"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Car, FileText, CreditCard, Settings, Map, CheckSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

export function MainNav() {
  const pathname = usePathname()

  const routes: NavItem[] = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/customers", label: "Customers", icon: Users },
    { href: "/vehicles", label: "Vehicles", icon: Car },
    { href: "/rentals", label: "Rentals", icon: FileText },
    { href: "/documents", label: "Documents", icon: CheckSquare },
    { href: "/tracking", label: "Tracking", icon: Map },
    { href: "/finance", label: "Finance", icon: CreditCard },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="flex items-center overflow-x-auto bg-card border-b px-4 py-3 md:px-6 md:py-4">
      <div className="flex space-x-4 md:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <route.icon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline-block">{route.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
