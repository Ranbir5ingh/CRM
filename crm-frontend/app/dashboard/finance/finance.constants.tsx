import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar } from "lucide-react";

export const RecentTransaction = (refetch: any): ColumnDef<any>[] => {
  return [
    {
      header: "S/N",
      accessorFn: (_, index) => index + 1,
      size: 4,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return (
          <div className="flex items-center justify-center">
            <Calendar className="mr-2 h-4 w-4" />
            {date.toLocaleDateString() +" "+ date.toLocaleTimeString()}
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return (
          <div>{row.original.description}</div>
        );
      },
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.type == "INCOME"
              ? row.original.rentals.customers.full_name
              : "Admin"}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return <div>₹{row.original.amount}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <div>
            <div
              className={`font-bold ${
                type == "INCOME" ? "text-green-500" : "text-red-500"
              }`}
            >
              {row.original.type}
            </div>
          </div>
        );
      },
    },
  ];
};
