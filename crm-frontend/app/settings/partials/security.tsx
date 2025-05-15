"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleBtn } from "@/components/partials/toggle-btn"
import { Save } from "lucide-react"

interface SecuritySetting {
  title: string
  description: string
  type: "select" | "toggle"
  defaultValue?: string
  options?: { value: string; label: string }[]
}

const passwordSettings: SecuritySetting[] = [
  {
    title: "Minimum Password Length",
    description: "Set the minimum required password length",
    type: "select",
    defaultValue: "8",
    options: [
      { value: "6", label: "6 characters" },
      { value: "8", label: "8 characters" },
      { value: "10", label: "10 characters" },
      { value: "12", label: "12 characters" },
    ],
  },
  {
    title: "Require Special Characters",
    description: "Passwords must contain special characters",
    type: "toggle",
  },
  {
    title: "Require Numbers",
    description: "Passwords must contain at least one number",
    type: "toggle",
  },
]

const accountSettings: SecuritySetting[] = [
  {
    title: "Two-Factor Authentication",
    description: "Require two-factor authentication for all users",
    type: "toggle",
  },
  {
    title: "Password Expiry",
    description: "Force password reset after specified period",
    type: "select",
    defaultValue: "90",
    options: [
      { value: "30", label: "30 Days" },
      { value: "60", label: "60 Days" },
      { value: "90", label: "90 Days" },
      { value: "0", label: "Never" },
    ],
  },
  {
    title: "Account Lockout",
    description: "Lock account after failed login attempts",
    type: "toggle",
  },
]

const apiSettings: SecuritySetting[] = [
  {
    title: "API Key Management",
    description: "Enable API key management for integrations",
    type: "toggle",
  },
  {
    title: "API Rate Limiting",
    description: "Limit API requests to prevent abuse",
    type: "toggle",
  },
]

export function Security() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Password Policy</h3>
            <div className="space-y-4">
              {passwordSettings.map((setting, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-medium">{setting.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  {setting.type === "select" ? (
                    <Select defaultValue={setting.defaultValue}>
                      <SelectTrigger className="w-full sm:w-[160px] md:w-[180px] mt-1 sm:mt-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {setting.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex justify-end mt-1 sm:mt-0">
                      <ToggleBtn />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Security</h3>
            <div className="space-y-4">
              {accountSettings.map((setting, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-medium">{setting.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  {setting.type === "select" ? (
                    <Select defaultValue={setting.defaultValue}>
                      <SelectTrigger className="w-full sm:w-[160px] md:w-[180px] mt-1 sm:mt-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {setting.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex justify-end mt-1 sm:mt-0">
                      <ToggleBtn />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">API Security</h3>
            <div className="space-y-4">
              {apiSettings.map((setting, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-medium">{setting.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <div className="flex justify-end mt-1 sm:mt-0">
                    <ToggleBtn />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Save Security Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Protection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-medium">Data Encryption</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Enable encryption for sensitive data</p>
                </div>
                <div className="flex justify-end mt-1 sm:mt-0">
                  <ToggleBtn />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-medium">Automated Backups</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Enable automated data backups</p>
                </div>
                <div className="flex justify-end mt-1 sm:mt-0">
                  <ToggleBtn />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-medium">Data Retention Policy</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Automatically delete old data based on retention policy
                  </p>
                </div>
                <div className="flex justify-end mt-1 sm:mt-0">
                  <ToggleBtn />
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Save Data Protection Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}