import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


export default function ViewRentalSkeleton() {
    return (
        <div className="p-10 grid grid-cols-1 gap-6 w-full max-w-full mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Skeleton className="h-10 w-48" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
  
          {/* Status Badge Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
  
          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Details Skeleton */}
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-7 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  {/* Profile Image Skeleton */}
                  <Skeleton className="w-24 h-24 rounded-full" />
  
                  {/* Customer Info Skeleton */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 flex-grow">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`customer-skeleton-${i}`}
                        className="flex items-center gap-2"
                      >
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
  
            {/* Vehicle Details Skeleton */}
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-7 w-40" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {/* Vehicle Image Skeleton */}
                  <div className="col-span-1 sm:col-span-2 mb-2">
                    <Skeleton className="w-full h-40 rounded-lg" />
                  </div>
  
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`vehicle-skeleton-${i}`}
                      className="flex items-center gap-2"
                    >
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
  
          {/* Rental Details Skeleton */}
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-7 w-40" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={`rental-skeleton-${i}`}
                    className="flex items-center gap-2"
                  >
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
  
          {/* Action Buttons Skeleton */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg md:static md:shadow-none md:border-0 md:bg-transparent md:p-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-3 max-w-full mx-auto">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      );
}
