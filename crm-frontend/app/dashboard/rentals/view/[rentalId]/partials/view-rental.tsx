"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Trash,
  Ban,
  Copy,
  FileText,
  User,
  Phone,
  MapPin,
  Calendar,
  Car,
  Palette,
  Hash,
  Users,
  DollarSign,
  Clock,
  Tag,
  FileTextIcon as FileText2,
  CreditCard,
  CheckCircle2,
  PlayCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import ViewRentalSkeleton from "./skeleton";
import { RentalDto, statusDto } from "../../../rental.dto";

type ViewRentalProps = {
  rentalData: RentalDto | null;
  isLoading: boolean;
  isPending: boolean;
  changeStatusHandler: (status: statusDto) => void;
};

export default function RentalsDetailView({
  rentalData,
  isLoading,
  changeStatusHandler,
  isPending,
}: ViewRentalProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CREATED":
        return "bg-blue-100 text-blue-800 border-blue-800";
      case "INPROGRESS":
        return "bg-green-100 text-green-800 border-green-700";
      case "COMPLETED":
        return "bg-purple-100 text-purple-800 border-purple-600";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-800";
      case "DELETED":
        return "bg-red-100 text-red-800 border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-600";
    }
  };

  const calculateDuration = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "";
    
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days`;
    } catch (error) {
      return "";
    }
  };

  if (isLoading) return <ViewRentalSkeleton />;

  return (
    <div className="p-3 sm:p-5 lg:p-8 grid grid-cols-1 gap-3 sm:gap-5 w-full max-w-full mx-auto">
      {/* Header - More responsive with better spacing */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Rental Details</h1>
        <div className="flex-wrap gap-2 hidden">
          <Button
            variant="outline"
            className="flex items-center text-xs sm:text-sm border-2 border-gray-700 gap-1 h-8 sm:h-9 px-2 sm:px-3"
            disabled={isPending}
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" /> Invoice
          </Button>

          {rentalData?.status !== "COMPLETED" &&
            rentalData?.status !== "CANCELLED" &&
            rentalData?.status !== "DELETED" && (
              <>
                <Button
                  variant="destructive"
                  className="flex items-center text-xs sm:text-sm gap-1 h-8 sm:h-9 px-2 sm:px-3"
                  disabled={isPending}
                  onClick={() => changeStatusHandler("CANCELLED")}
                >
                  <Ban className="w-3 h-3 sm:w-4 sm:h-4" /> Cancel
                </Button>

                {rentalData && (
                  <Button
                    variant="destructive"
                    className="flex items-center text-xs sm:text-sm gap-1 h-8 sm:h-9 px-2 sm:px-3"
                    disabled={isPending}
                    onClick={() => changeStatusHandler("DELETED")}
                  >
                    <Trash className="w-3 h-3 sm:w-4 sm:h-4" /> Delete
                  </Button>
                )}
              </>
            )}
        </div>
      </div>

      {/* Status Badge - Improved sizing for small screens */}
      {rentalData ? (
        <>
          <div className="flex items-center gap-2">
            {rentalData?.status && (
              <p
                className={`text-xs sm:text-sm font-bold border-2 px-2 py-0.5 sm:py-1 rounded-sm ${getStatusColor(
                  rentalData.status
                )}`}
              >
                {rentalData.status}
              </p>
            )}
            <span className="text-xs text-gray-500">
              ID: {rentalData?.id ? rentalData.id.substring(0, 8) + "..." : "N/A"}
            </span>
          </div>

          {/* Main Content - Adjusted grid layout for better responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
            {/* Customer Details Card */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-5 pt-3 sm:pt-5">
                <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-5 pb-3 sm:pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-3">
                  {/* Customer Image - More responsive sizing */}
                  <div className="flex justify-center sm:justify-start">
                    {rentalData?.customers?.profile ? (
                      <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={rentalData.customers.profile}
                          alt="Customer profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Customer Info - Improved spacing and text sizing */}
                  <div className="mt-2 sm:mt-4">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">Full Name:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.customers?.full_name || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">Phone:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.customers?.phone || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">Address:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.customers?.address || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">DOB:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.customers?.date_of_birth || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Details Card */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-5 pt-3 sm:pt-5">
                <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-5 pb-3 sm:pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-3">
                  {/* Vehicle Image - Better responsive sizing */}
                  <div className="flex justify-center sm:justify-start">
                    {rentalData?.vehicles?.vehicle_image ? (
                      <div className="relative w-full h-36 sm:h-44 md:h-48 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={rentalData.vehicles.vehicle_image}
                          alt="Vehicle"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-36 sm:h-44 md:h-48 rounded-lg bg-gray-200 flex items-center justify-center">
                        <Car className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Vehicle Info - Enhanced text sizing and spacing */}
                  <div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <Car className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">Brand:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.vehicles?.brand || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">Model:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.vehicles?.model || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <Palette className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">Color:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.vehicles?.color || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">Vehicle Number:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.vehicles?.vehicle_number || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">Seating Capacity:</p>
                      <p className="font-medium text-xs sm:text-sm">
                        {rentalData?.vehicles?.seating_capacity || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1">
                      <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Rental Price per Day:
                      </p>
                      <p className="font-medium text-red-500 text-xs sm:text-sm">
                        ₹{rentalData?.vehicles?.rental_price_per_day || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rental Details Card - Improved grid layout for different screen sizes */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-5 pt-3 sm:pt-5">
              <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <FileText2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> Rental
                Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-5 pb-3 sm:pb-5">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3">
                <div className="flex flex-wrap items-center gap-1">
                  <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">Title:</p>
                  <p className="font-medium text-xs">{rentalData?.title || "N/A"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">Description:</p>
                  <p className="font-medium text-xs">{rentalData?.description || "N/A"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">Created At:</p>
                  <p className="font-medium text-xs">
                    {rentalData?.created_at ? formatDate(rentalData.created_at) : "N/A"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">Start Date:</p>
                  <p className="font-medium text-xs">
                    {rentalData?.startDate ? formatDate(rentalData.startDate) : "N/A"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">End Date:</p>
                  <p className="font-medium text-xs">
                    {rentalData?.endDate ? formatDate(rentalData.endDate) : "N/A"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">Total Amount:</p>
                  <p className="font-medium text-xs">₹{rentalData?.totalAmount || "0"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">Advance Payment:</p>
                  <p className="font-medium text-xs">₹{rentalData?.advance || "0"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">Balance Due:</p>
                  <p className="font-medium text-red-500 text-xs">
                    ₹
                    {(rentalData.status === "CREATED" || rentalData.status === "INPROGRESS") && 
                     typeof rentalData?.totalAmount === 'number' && 
                     typeof rentalData?.advance === 'number'
                      ? (rentalData.totalAmount - rentalData.advance).toString()
                      : "____"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-500 text-xs">Duration:</p>
                  <p className="font-medium text-xs">
                    {calculateDuration(rentalData?.startDate, rentalData?.endDate) || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons - Improved mobile experience */}
          <div className="relative bottom-0 left-0 right-0 bg-transparent p-0 z-10">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 max-w-full mx-auto">
              {rentalData?.status === "CREATED" && (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 sm:gap-2 h-8 sm:h-9 px-3 sm:px-4"
                  onClick={() => changeStatusHandler("INPROGRESS")}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs">Updating</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs">Start</span>
                    </>
                  )}
                </Button>
              )}

              {rentalData?.status === "INPROGRESS" && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1 sm:gap-2 h-8 sm:h-9 px-3 sm:px-4"
                  onClick={() => changeStatusHandler("COMPLETED")}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs">Updating</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" /> 
                      <span className="text-xs">Complete</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-4 sm:p-8">
          <h2 className="text-lg sm:text-xl font-medium text-gray-500">No data found</h2>
        </div>
      )}
    </div>
  );
}