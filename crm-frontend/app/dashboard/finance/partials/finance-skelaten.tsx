import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RefreshCw, DollarSign, CreditCard, Home } from "lucide-react"

export default function FinancePageSkeleton() {
  return (
    <div className="flex flex-col p-4 md:p-10 space-y-6 w-full">
      <h1 className="text-3xl md:text-4xl font-bold">Financial Management</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <Skeleton className="h-8 w-28" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Expenses Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <Skeleton className="h-8 w-28" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Profit Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <Skeleton className="h-8 w-28" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Rentals Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <Skeleton className="h-8 w-28" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Overview */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly revenue and expenses</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <Skeleton className="h-full w-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="w-full max-w-sm">
            <Input placeholder="Search transactions..." />
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        <div className="rounded-md border">
          <div className="bg-muted px-4 py-3">
            <div className="grid grid-cols-6 gap-4 font-medium">
              <div>S/N</div>
              <div>Date</div>
              <div>Description</div>
              <div>Customer</div>
              <div>Amount</div>
              <div>Type</div>
            </div>
          </div>
          <div className="divide-y">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 px-4 py-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
