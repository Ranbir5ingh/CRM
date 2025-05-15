import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Mail, Phone, SquarePen, Trash, User, UserRoundPen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAxios } from "@/services/axios/axios.hook";
import { toast } from "react-toastify";
import { useState } from "react";
import  CreateVehicleForm from "./partials/create-vehicle-form";
import { CreateVehicleDto } from "./vehicle.schema";
import { updateVehicle, deleteVehicle } from "./vehicle.api";
import { VehicleInfoDisplay } from "./partials/view-vehicle";

export const VehicleDataCol = (refect: any): ColumnDef<any>[] => {
  return [
    {
      header: "S/N",
      accessorFn: (_, index) => index + 1,
      size: 4,
    },
    {
      accessorKey: "car number",
      header: "Vehiclle Number",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              {row.original.vehicle_image ? (
                <AvatarImage
                  src={row.original.vehicle_image}
                  alt={row.original.vehicle_number}
                />
              ) : (
                <AvatarFallback className="bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{row.original.vehicle_number}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "Vehicle Name",
      header: "Brand / Model",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 items-center">
            <div className="flex items-center text-sm">
              {row.original.brand}
            </div>
            <div className="flex items-center text-sm">
              {row.original.model}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "manufacture_year",
      header: "Manufacture Year",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              {row.original.manufacture_year}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "fuel_type",
      header: "Fuel Type",
      cell: ({ row }) => {
        return (
          <div>
            <div className="font-medium"> {row.original.fuel_type}</div>
            <div className="text-sm text-muted-foreground"></div>
          </div>
        );
      },
    },
    {
      accessorKey: "seating_capacity",
      header: "Seating Capacity",
      cell: ({ row }) => {
        return (
          <div>
            <div className="font-medium"> {row.original.seating_capacity}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "Rental Price/day",
      header: "rental_price_per_day",
      cell: ({ row }) => {
        return (
          <div>
            <div className="font-medium">
              {" "}
              {row.original.rental_price_per_day}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        console.log("veh sctatu", row.original.vehicle_status);
        return (
          <div>
            <div
              className={`font-bold ${
                row.original.vehicle_status == "AVAILABLE"
                  ? "text-green-500"
                  : row.original.vehicle_status == "RENTAL"
                  ? "text-blue-500"
                  : row.original.vehicle_status == "MAINTENANCE"
                  ? "text-orange-500"
                  : "text-red-700"
              }`}
            >
              {row.original.vehicle_status}
            </div>
          </div>
        );
      },
    },
    {
      header: "Actions",
      accessorFn: (row) => row,
      cell: ({ row }) => {
        const { axios } = useAxios();
        const [updateDialog, setupdateDialog] = useState(false);
        async function handleUpdateCustomer(data: CreateVehicleDto) {
          try {
            const res = await updateVehicle(row.original.id, axios, data);
            if (res) toast.success("Customer Updated Successfully");
          } catch (error: any) {
            toast.error(error?.message + "something went wrong");
          } finally {
            setupdateDialog(false);
            refect();
          }
        }

        const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

        async function handleDeleteVehicle() {
          try {
            const res = await deleteVehicle(axios, row.original.id);
            if (res) {
              toast.success("Vehicle deleted successfully");
              refect();
            }
          } catch (error: any) {
            toast.error(error?.message + " something went wrong");
          } finally {
            setDeleteDialogOpen(false);
          }
        }

        return (
          <div className="flex gap-3 justify-center  ">
            <Dialog>
              <DialogTrigger className="flex items-center p-1.5 text-black bg-gray-200 rounded-sm">
                <Eye className=" h-4 w-4" />
              </DialogTrigger>
              <DialogContent className="w-full max-w-md md:max-w-4xl h-[90vh] overflow-y-auto bg-white text-black">
                <DialogTitle className="hidden"></DialogTitle>
                <VehicleInfoDisplay vehicle={row.original} />
              </DialogContent>
            </Dialog>
            <Dialog
              modal={false}
              open={updateDialog}
              onOpenChange={setupdateDialog}
            >
              <DialogTrigger
                asChild
                className="flex items-center p-1.5 bg-gray-200 text-black rounded-sm"
              >
                <SquarePen
                  className="h-8 w-8"
                  onClick={() => setupdateDialog(true)}
                />
              </DialogTrigger>
              <DialogContent className="w-full max-w-md md:max-w-4xl h-[90vh] overflow-y-auto bg-white text-black">
                <DialogTitle className="hidden"></DialogTitle>

                <CreateVehicleForm
                  title="Update Customer"
                  submitLabel="Update"
                  onSubmit={handleUpdateCustomer}
                  initialData={row.original}
                />
              </DialogContent>
            </Dialog>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="flex items-center p-1.5 bg-red-600 text-white rounded-sm"
                  title="Delete Vehicle"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-xs md:max-w-md bg-white text-black">
                <DialogTitle>Confirm Delete</DialogTitle>
                <div>Are you sure you want to delete this vehicle?</div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded"
                    onClick={handleDeleteVehicle}
                  >
                    Delete
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
      size: 10,
    },
  ];
};