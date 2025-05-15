"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash, Save, Plus } from "lucide-react"

interface User {
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
}

interface Permission {
  module: string
  admin: string
  manager: string
  employee: string
}

// Mock API functions
const fetchUsers = async (): Promise<User[]> => {
  return [
    {
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2023-03-05 10:30 AM",
    },
    {
      name: "Manager User",
      email: "manager@example.com",
      role: "manager",
      status: "active",
      lastLogin: "2023-03-04 09:15 AM",
    },
    {
      name: "Employee One",
      email: "employee1@example.com",
      role: "employee",
      status: "active",
      lastLogin: "2023-03-05 08:45 AM",
    },
    {
      name: "Employee Two",
      email: "employee2@example.com",
      role: "employee",
      status: "inactive",
      lastLogin: "2023-02-28 11:20 AM",
    },
  ]
}

const fetchPermissions = async (): Promise<Permission[]> => {
  return [
    {
      module: "Customer Management",
      admin: "Full Access",
      manager: "Full Access",
      employee: "View Only",
    },
    {
      module: "Vehicle Management",
      admin: "Full Access",
      manager: "Full Access",
      employee: "View Only",
    },
    {
      module: "Rental Management",
      admin: "Full Access",
      manager: "Full Access",
      employee: "Create, View",
    },
    {
      module: "Document Verification",
      admin: "Full Access",
      manager: "Full Access",
      employee: "Upload, View",
    },
    {
      module: "Financial Management",
      admin: "Full Access",
      manager: "View Only",
      employee: "No Access",
    },
    {
      module: "User Management",
      admin: "Full Access",
      manager: "No Access",
      employee: "No Access",
    },
  ]
}

export function UserManagement() {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const { data: permissions = [] } = useQuery({
    queryKey: ["permissions"],
    queryFn: fetchPermissions,
  })

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full">
      <Card className="max-w-full">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>User Management</CardTitle>
          <Button className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent className="px-1 sm:px-6 overflow-hidden">
          <div className="rounded-md border w-full overflow-x-auto no-scrollbar">
            <div className="min-w-full inline-block align-middle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px] sm:w-auto whitespace-nowrap">User</TableHead>
                    <TableHead className="whitespace-nowrap">Role</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="hidden sm:table-cell whitespace-nowrap">Last Login</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="p-2 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Avatar className="hidden sm:flex h-6 w-6 sm:h-8 sm:w-8">
                            <AvatarFallback className="bg-primary/10 text-xs">{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm sm:text-base">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-2 sm:p-4 whitespace-nowrap text-xs sm:text-sm">{user.role}</TableCell>
                      <TableCell className="p-2 sm:p-4 whitespace-nowrap">
                        <Badge variant={user.status === "active" ? "default" : "secondary"} className="text-xs">{user.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell p-2 sm:p-4 whitespace-nowrap text-xs sm:text-sm">{user.lastLogin}</TableCell>
                      <TableCell className="p-2 sm:p-4 text-right whitespace-nowrap">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                          <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-full">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent className="px-1 sm:px-6 overflow-hidden">
          <div className="rounded-md border w-full overflow-x-auto no-scrollbar">
            <div className="min-w-full inline-block align-middle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="p-2 sm:p-4 whitespace-nowrap">Module</TableHead>
                    <TableHead className="p-2 sm:p-4 whitespace-nowrap">Admin</TableHead>
                    <TableHead className="p-2 sm:p-4 whitespace-nowrap">Manager</TableHead>
                    <TableHead className="p-2 sm:p-4 whitespace-nowrap">Employee</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((permission, index) => (
                    <TableRow key={index}>
                      <TableCell className="p-2 sm:p-4 whitespace-nowrap text-xs sm:text-sm">{permission.module}</TableCell>
                      <TableCell className="p-2 sm:p-4 whitespace-nowrap text-xs sm:text-sm">{permission.admin}</TableCell>
                      <TableCell className="p-2 sm:p-4 whitespace-nowrap text-xs sm:text-sm">{permission.manager}</TableCell>
                      <TableCell className="p-2 sm:p-4 whitespace-nowrap text-xs sm:text-sm">{permission.employee}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <Button className="mt-4 w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Save Permissions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}