"use client"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { General } from "./general"
import { UserManagement } from "./user-management"
import { Notifications } from "./notifications"
import { Security } from "./security"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isMobile, setIsMobile] = useState(false)
  
  // Tab configuration
  const tabs = [
    { id: "general", label: "General", component: <General /> },
    { id: "users", label: "Users", component: <UserManagement /> },
    { id: "notifications", label: "Notifications", component: <Notifications /> },
    { id: "security", label: "Security", component: <Security /> }
  ]
  
  // Check viewport width on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typically md breakpoint
    }
    
    // Initial check
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])
  
  // Handler for desktop tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }
  
  // Handler for mobile dropdown
  const handleDropdownChange = (value: string) => {
    setActiveTab(value)
  }
  
  return (
    <div className="flex flex-col p-2 sm:p-4 md:p-8 lg:p-10 space-y-4 sm:space-y-6 max-w-full overflow-x-hidden">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Mobile view - shadcn dropdown */}
        <div className={`md:hidden w-full mb-4 ${isMobile ? 'block' : 'hidden'}`}>
          <Select value={activeTab} onValueChange={handleDropdownChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select settings" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map(tab => (
                <SelectItem key={tab.id} value={tab.id}>
                  {tab.label} Settings
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Desktop view - original tabs */}
        <div className={`hidden md:block ${!isMobile ? 'block' : 'hidden'}`}>
          <TabsList className="mb-4">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="min-w-[80px]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {/* Tab content (same for both mobile and desktop) */}
        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id} className="mt-4 max-w-full">
            {tab.id === "users" ? (
              tab.component
            ) : (
              <Card className="max-w-full">
                <CardHeader>
                  <CardTitle>{tab.label} Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  {tab.component}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}