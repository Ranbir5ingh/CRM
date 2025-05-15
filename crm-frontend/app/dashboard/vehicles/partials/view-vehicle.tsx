import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, PenTool, Fuel, Users, Banknote, Gauge } from "lucide-react"
import { useState } from "react"

// Enum types from your DTO
export enum VEHICLE_STATUS {
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  MAINTENANCE = "MAINTENANCE",
  INACTIVE = "INACTIVE",
}

export enum FuelType {
  PETROL = "PETROL",
  DIESEL = "DIESEL",
  CNG = "CNG",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

// Vehicle interface based on your DTO
interface VehicleInfo {
  vehicle_number?: string
  brand?: string
  model?: string
  manufacture_year?: number
  vehicle_status?: VEHICLE_STATUS
  fuel_type?: FuelType
  seating_capacity?: number
  rental_price_per_day?: number
  color?: string
  mileage?: number
  insurance_valid_till?: Date
  pollution_valid_date?: Date
  last_service_date?: Date
  vehicle_image?: string
  registration_doc?: string
}

// Function to format date to a readable format
const formatDate = (date?: Date) => {
  if (!date) return "N/A"
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Function to get status badge color
const getStatusColor = (status?: VEHICLE_STATUS) => {
  if (!status) return "bg-gray-200"

  switch (status) {
    case VEHICLE_STATUS.AVAILABLE:
      return "bg-green-500 hover:bg-green-600"
    case VEHICLE_STATUS.RENTED:
      return "bg-blue-500 hover:bg-blue-600"
    case VEHICLE_STATUS.MAINTENANCE:
      return "bg-yellow-500 hover:bg-yellow-600"
    case VEHICLE_STATUS.INACTIVE:
      return "bg-red-500 hover:bg-red-600"
    default:
      return "bg-gray-200"
  }
}

// Sample vehicle data removed as it's passed as a prop

export function VehicleInfoDisplay({ vehicle }: { vehicle: VehicleInfo }) {
  const [activeTab, setActiveTab] = useState("images");


  return (
    <div className="w-full mx-auto p-3 sm:p-6 bg-white rounded-lg shadow-sm">
      {/* Top Row: Brand, Model, Number and Status */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-muted-foreground mt-1">{vehicle.vehicle_number}</p>
          </div>
          {vehicle.vehicle_status && (
            <Badge className={`${getStatusColor(vehicle.vehicle_status)} text-base sm:text-lg px-3 py-1 mt-2 sm:mt-0`}>
              {vehicle.vehicle_status}
            </Badge>
          )}
        </div>
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Mobile Tab Navigation */}
      <div className="sm:hidden mb-4">
        <div className="flex border-b">
          <button 
            className={`flex-1 py-2 px-4 text-center ${activeTab === "images" ? "border-b-2 border-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("images")}
          >
            Images
          </button>
          <button 
            className={`flex-1 py-2 px-4 text-center ${activeTab === "info" ? "border-b-2 border-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            Vehicle Info
          </button>
        </div>
      </div>

      {/* Images Section (visible based on tab on mobile) */}
      <div className={`${activeTab === "images" ? "block" : "hidden"} sm:block mb-4 sm:mb-6`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold">Vehicle Image</h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
              <img
                src={vehicle.vehicle_image}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold">Registration Document</h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
              <img
                src={vehicle.registration_doc}
                alt="Registration Document"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {activeTab === "images" && <Separator className="my-4 sm:hidden" />}

      {/* Vehicle Information Section (visible based on tab on mobile) */}
      <div className={`${activeTab === "info" ? "block" : "hidden"} sm:block`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Basic Information */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Basic Information</h2>

            <div className="grid grid-cols-2 gap-y-3">
              <p className="text-base sm:text-lg font-bold">Color:</p>
              <p className="text-base sm:text-lg">{vehicle.color || "N/A"}</p>

              <p className="text-base sm:text-lg font-bold">Year:</p>
              <p className="text-base sm:text-lg">{vehicle.manufacture_year || "N/A"}</p>

              <p className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Fuel className="h-4 w-4 sm:h-5 sm:w-5" />
                Fuel Type:
              </p>
              <p className="text-base sm:text-lg">{vehicle.fuel_type || "N/A"}</p>

              <p className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Seating:
              </p>
              <p className="text-base sm:text-lg">{vehicle.seating_capacity || "N/A"}</p>

              <p className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Gauge className="h-4 w-4 sm:h-5 sm:w-5" />
                Mileage:
              </p>
              <p className="text-base sm:text-lg">{vehicle.mileage ? `${vehicle.mileage} km/l` : "N/A"}</p>
            </div>
          </div>

          {/* Rental & Maintenance Information */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Rental & Maintenance</h2>

            <div className="grid grid-cols-2 gap-y-3">
              <p className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Banknote className="h-4 w-4 sm:h-5 sm:w-5" />
                Daily Rate:
              </p>
              <p className="text-base sm:text-lg">
                {vehicle.rental_price_per_day ? `₹${vehicle.rental_price_per_day.toLocaleString()}/day` : "N/A"}
              </p>

              <p className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                Insurance:
              </p>
              <p className="text-base sm:text-lg">{formatDate(vehicle.insurance_valid_till)}</p>

              <p className="text-base sm:text-lg font-bold flex items-center gap-2">
                <PenTool className="h-4 w-4 sm:h-5 sm:w-5" />
                Pollution:
              </p>
              <p className="text-base sm:text-lg">{formatDate(vehicle.pollution_valid_date)}</p>
              
              <p className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Fuel className="h-4 w-4 sm:h-5 sm:w-5" />
                Last Service:
              </p>
              <p className="text-base sm:text-lg">{formatDate(vehicle.last_service_date)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}