"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Search, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { customerData, vehicleData } from "../rental.dto";

interface AddCustomerDialogBoxProps {
  onCustomerSubmit?: React.Dispatch<React.SetStateAction<customerData | null>>;
  onVehicleSubmit?: React.Dispatch<React.SetStateAction<vehicleData | null>>;
  setDialogClose?: React.Dispatch<React.SetStateAction<boolean>>;
  submitLabel: string;
  title: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  customerData?: customerData[];
  vehicleData?: vehicleData[];
  isFetching: boolean;
}

export default function AddCustomerDialogBox({
  onCustomerSubmit,
  onVehicleSubmit,
  setDialogClose,
  title,
  submitLabel,
  setSearch,
  customerData,
  vehicleData,
  isFetching,
}: AddCustomerDialogBoxProps) {
  return (
    <div className="w-full h-[70vh] mx-auto p-2 sm:p-4 md:p-6 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
      <Separator />

      <div className="mt-4 sm:mt-6 grid grid-rows-[auto_1fr] h-full box-border">
        <div className="relative mb-4">
          <label className="text-sm mb-2 block">
            {title.includes("Customer")
              ? "Enter Name or Phone Number"
              : "Enter Vehicle Brand Or Model"}
          </label>
          <div className="relative flex-1">
            <Input
              className="pl-8 bg-gray-100"
              placeholder="Search "
              onChange={(e) => setSearch(e.target.value.trim())}
            />
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
          </div>
        </div>
        <div className="overflow-y-auto pb-16 sm:pb-20">
          {isFetching ? (
            <div className="w-full h-full flex justify-center items-center text-gray-400">
              Loading ...
            </div>
          ) : customerData?.length ? (
            customerData.map((user, index: number) => {
              return (
                <Card key={index} className="p-3 sm:p-4 md:p-6 mb-3 h-min">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                        <Avatar className="h-full w-full">
                          <AvatarImage src={user?.profile} alt="Profile" />
                          <AvatarFallback>{user.full_name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium truncate">{user.full_name}</span>
                          <Badge variant="secondary" className="font-normal text-xs">
                            {user.gender}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="truncate">{user.phone}</span>
                          <span className="truncate">Address: {user.address.slice(0, 20)}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-purple-100 hover:bg-purple-200 text-purple-700 w-full sm:w-auto mt-2 sm:mt-0"
                      onClick={() => {
                        onCustomerSubmit && onCustomerSubmit(user);
                        setDialogClose && setDialogClose(false);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              );
            })
          ) : (
            vehicleData &&
            vehicleData.map((vehicle, index: number) => {
              return (
                <Card key={index} className="p-3 sm:p-4 md:p-6 mb-3 h-min">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                        <Avatar className="h-full w-full">
                          <AvatarImage
                            src={vehicle?.vehicle_image}
                            alt="Profile"
                          />
                          <AvatarFallback>{vehicle.brand[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">
                            {vehicle.brand +
                              " " +
                              vehicle.model +
                              " " +
                              vehicle.color}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="truncate">{vehicle.vehicle_number}</span>
                          <span className="truncate">
                            Seating Capacity: {vehicle.seating_capacity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-purple-100 hover:bg-purple-200 text-purple-700 w-full sm:w-auto mt-2 sm:mt-0"
                      onClick={() => {
                        onVehicleSubmit && onVehicleSubmit(vehicle);
                        setDialogClose && setDialogClose(false);
                      }}
                      disabled={vehicle.vehicle_status != "AVAILABLE"}
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}