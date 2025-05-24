"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Mail, Phone, User, UserRoundPen, Trash } from "lucide-react";
import CreateCustomerForm from "./partials/create-cutomer-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateCustomer, deleteCustomer } from "./customer.api";
import { useAxios } from "@/services/axios/axios.hook";
import { toast } from "react-toastify";
import { useState } from "react";
import { ViewEmployeeDialog } from "./partials/view-customer-dialog";

// Define interfaces for the data types
interface Customer {
  id: string;
  full_name: string;
  profile?: string; // This is a string URL in the table data
  phone: string;
  email: string;
  date_of_birth: string;
  address: string;
  gender: string;
  aadhar_number?: string;
  dl_number?: string;
  status: "ACTIVE" | "INACTIVE" | "BLACKLISTED";
  [key: string]: any; // For any additional properties
}

// Define the expected update parameter type to match the updateCustomer function
interface CustomerUpdateParams {
  full_name?: string;
  profile?: File; // This is expected to be a File object for updates
  phone?: string;
  email?: string;
  date_of_birth?: string;
  address?: string;
  gender?: string;
  status?: "ACTIVE" | "INACTIVE" | "BLACKLISTED";
  [key: string]: any;
}

interface Vehicle {
  brand: string;
  vehicle_number: string;
  model: string;
}

interface Rental {
  id: string;
  title: string;
  vehicles: Vehicle;
  startDate: string;
  endDate: string;
  totalAmount: string;
  advance: string;
  status: "CREATED" | "COMPLETED" | "INPROGRESS" | "CANCELLED";
}


export const CustomerDataCol = (refetch: () => void): ColumnDef<Customer>[] => {
  return [
    {
      header: "S/N",
      accessorFn: (_, index) => index + 1,
      size: 4,
      // Make this column hidden on mobile
      cell: ({ row }) => {
        return <div className="hidden md:block">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              {row.original.profile ? (
                <AvatarImage
                  src={row.original.profile}
                  alt={row.original.full_name}
                />
              ) : (
                <AvatarFallback className="bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-sm">
              <div className="font-medium truncate max-w-[120px] md:max-w-full">
                {row.original.full_name}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 items-center">
            <div className="flex items-center text-xs md:text-sm">
              <Phone className="mr-1 h-3 w-3" />
              <span className="truncate max-w-[100px] md:max-w-full">
                {row.original.phone}
              </span>
            </div>
            <div className="flex items-center text-xs md:text-sm">
              <Mail className="mr-1 h-3 w-3" />
              <span className="truncate max-w-[100px] md:max-w-full">
                {row.original.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "dob",
      header: "DOB",
      // Hide this column on mobile
      cell: ({ row }) => {
        return (
          <div className="hidden md:block text-sm">{row.original.date_of_birth}</div>
        );
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      // Hide this column on mobile
      cell: ({ row }) => {
        return (
          <div className="hidden md:block">
            <div className="text-sm truncate max-w-[150px] lg:max-w-[200px]">
              {row.original.address}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      // Hide this column on mobile
      cell: ({ row }) => {
        return (
          <div className="hidden md:block">
            <div className="font-medium text-sm">{row.original.gender}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusClasses = {
          ACTIVE: "text-green-500",
          INACTIVE: "text-gray-500",
          BLACKLISTED: "text-red-500",
        };

        return (
          <div>
            <div
              className={`font-bold text-xs md:text-sm ${
                statusClasses[row.original.status] || "text-gray-500"
              }`}
            >
              {row.original.status}
            </div>
          </div>
        );
      },
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const { axios } = useAxios();
        const [updateDialog, setUpdateDialog] = useState(false);
        const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

        async function handleEditCustomers(data: CustomerUpdateParams) {
          try {
            const res = await updateCustomer(axios, data, row.original.id);
            if (res) toast.success("Customer Updated Successfully");
          } catch (error: any) {
            toast.error((error?.message || "") + " something went wrong");
          } finally {
            setUpdateDialog(false);
            refetch();
          }
        }

        async function handleDeleteCustomer() {
          try {
            const res = await deleteCustomer(axios, row.original.id);
            if (res) {
              toast.success("Customer deleted successfully");
              refetch();
            }
          } catch (error: any) {
            toast.error(error?.message + " something went wrong");
          } finally {
            setDeleteDialogOpen(false);
          }
        }

        return (
          <div className="flex gap-2 justify-center">
            <Dialog>
              <DialogTrigger className="flex items-center p-1.5 text-black bg-white rounded-sm">
                <Eye className="h-4 w-4" />
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md md:max-w-4xl h-[90vh] overflow-y-hidden bg-white text-black">
                <DialogTitle className="hidden"></DialogTitle>
                <ViewEmployeeDialog customerId={row.original.id} />
              </DialogContent>
            </Dialog>

            <Dialog
              modal={false}
              open={updateDialog}
              onOpenChange={setUpdateDialog}
            >
              <DialogTrigger
                asChild
                className="flex items-center p-1.5 bg-gray-200 text-black rounded-sm"
              >
                <div onClick={() => setUpdateDialog(true)}>
                  <UserRoundPen className="h-4 w-4" />
                </div>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md md:max-w-4xl h-[90vh] overflow-y-auto bg-white text-black">
                <DialogTitle className="hidden"></DialogTitle>
                <CreateCustomerForm
                  title="Update Customer"
                  submitLabel="Update"
                  onSubmit={handleEditCustomers}
                initialData={{
                  ...row.original,
                  profile: undefined,
                  image: row.original.profile || "",
                }}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="flex items-center p-1.5 bg-red-600 text-white rounded-sm"
                  title="Delete Customer"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-xs md:max-w-md bg-white text-black">
                <DialogTitle>Confirm Delete</DialogTitle>
                <div>Are you sure you want to delete this customer?</div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded"
                    onClick={handleDeleteCustomer}
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

export const CustomerRentalsCol = (refetch: () => void): ColumnDef<Rental>[] => {
  return [
    {
      header: "S/N",
      accessorFn: (_, index) => index + 1,
      size: 4,
      // Hide on mobile
      cell: ({ row }) => {
        return <div className="hidden md:block">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className="text-xs md:text-sm truncate max-w-[100px] md:max-w-full">
              {row.original.title}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "vehicle",
      header: "Vehicle",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 items-center">
            <div className="flex items-center text-xs md:text-sm truncate max-w-[120px] md:max-w-full">
              {row.original.vehicles.brand} ({row.original.vehicles.vehicle_number})
            </div>
            <div className="flex items-center text-xs md:text-sm truncate max-w-[120px] md:max-w-full">
              {row.original.vehicles.model}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 items-center">
            <div className="text-xs md:text-sm">{row.original.startDate}</div>
            <div className="text-xs md:text-sm">{row.original.endDate}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 text-center">
            <div className="text-xs md:text-sm">{row.original.totalAmount}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "advance",
      header: "Advance",
      // Hide on mobile
      cell: ({ row }) => {
        return (
          <div className="hidden md:block space-y-1">
            <div className="text-sm">{row.original.advance}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "dueAmount",
      header: "Due Amount",
      cell: ({ row }) => {
        const dueAmount =
          parseInt(row.original.totalAmount) - parseInt(row.original.advance);
        return (
          <div className="space-y-1">
            <div className="text-xs md:text-sm">{dueAmount}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusClasses = {
          CREATED: "text-orange-500",
          COMPLETED: "text-green-500",
          INPROGRESS: "text-blue-600",
          CANCELLED: "text-red-500",
        };

        return (
          <div>
            <div
              className={`font-bold text-xs md:text-sm ${
                statusClasses[row.original.status] || "text-gray-500"
              }`}
            >
              {row.original.status}
            </div>
          </div>
        );
      },
    },
  ];
};
