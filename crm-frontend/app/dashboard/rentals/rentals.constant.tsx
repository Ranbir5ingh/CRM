import { ColumnDef } from "@tanstack/react-table";

import { Eye, Phone } from "lucide-react";

import Link from "next/link";

export const RentalsDataCol = (refect: any): ColumnDef<any>[] => {
  return [
    {
      header: "S/N",
      accessorFn: (_, index) => index + 1,
      size: 4,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className=" items-center text-sm">{row.original.title}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "Customer",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 items-center">
            <div className="flex items-center text-sm">
              {row.original.customers.full_name}
            </div>
            <div className="flex items-center text-sm">
              <Phone className="mr-2 h-3 w-3" />
              {row.original.customers.phone}
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
            <div className="flex items-center text-sm">
              {row.original.vehicles.brand}{" ("} {row.original.vehicles.vehicle_number}{")"}
            </div>
            <div className="flex items-center text-sm">
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
            <div className=" items-center text-sm">
              {row.original.startDate} {"-"}
            </div>
            <div className=" items-center text-sm">{row.original.endDate}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "total amount",
      header: "Total Amount",
      cell: ({ row }) => {
        return (
          <div className="space-y-1 text-center">
            <div className="items-center text-sm">
              {row.original.totalAmount}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "advance",
      header: "Advance",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className=" items-center text-sm">{row.original.advance}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "Due Amount",
      header: "due amount",
      cell: ({ row }) => {
        return (
          <div className="space-y-1">
            <div className=" items-center text-sm">
              {parseInt(row.original.totalAmount) -
                parseInt(row.original.advance)}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div>
            <div
              className={`font-bold ${
                row.original.status == "CREATED"
                  ? "text-orange-500"
                  : row.original.status == "COMPLETED"
                  ? "text-green-500"
                  : row.original.status == "INPROGRESS"
                  ? "text-blue-600"
                  : "text-red-500"
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
      accessorFn: (row) => row,
      cell: ({ row }) => {
        return (
          <div className="flex gap-3 justify-center  ">
            <Link
              href={`/dashboard/rentals/view/${row.original.id}`}
              className="p-2 bg-gray-300 rounded-sm"
            >
              <Eye className=" h-4 w-4" />
            </Link>
          </div>
        );
      },
      size: 10,
    },
  ];
};
