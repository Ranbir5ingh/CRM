"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useAxios } from "../../../../services/axios/axios.hook";
import { ViewEmployeeDialogSkeleton } from "./view-customer-skeleton";
import { CustomerDetail } from "../customer.types";
import { DataTable } from "../../../../components/CommonTable";
import { getcustomerDetails } from "../customer.api";
import { CustomerRentalsCol } from "../customers.constant";

type ViewCustomerDialogProps = {
  customerId: string;
};

export function ViewEmployeeDialog({ customerId }: ViewCustomerDialogProps) {
  const { axios } = useAxios();
  const { data, isFetching } = useQuery<CustomerDetail>({
    queryKey: [`customer-${customerId}`],
    queryFn: async () => await getcustomerDetails(axios, customerId),
  });

  if (isFetching) return <ViewEmployeeDialogSkeleton />;

  return (
    <div className="px-4 md:px-8 space-y-6 md:space-y-10 h-[80vh] overflow-y-auto">
      {/* Customer Name */}
      <h2 className="text-2xl md:text-3xl font-semibold border-b pb-2">Customer Detail</h2>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto">
          <div className="relative">
            <Avatar
              className="w-24 h-24 md:w-32 md:h-32 border-4 rounded-2xl"
              style={{ borderColor: "gray" }}
            >
              <AvatarImage
                src={
                  data?.profile ??
                  "https://cdn.hdsenterprise.com/static/profileImagePlaceholder.png"
                }
                alt="Customer"
              />
              <AvatarFallback className="rounded-xl">
                {data?.full_name?.[0] || ""}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2 md:space-y-3 text-black font-semibold">
            <p className="text-xl md:text-2xl font-bold">{data?.full_name}</p>
            <p className="text-base md:text-lg">
              {data?.date_of_birth 
                ? `${new Date().getFullYear() - new Date(data.date_of_birth).getFullYear()}yr, `
                : ""}{data?.gender || ""}
            </p>
          </div>
        </div>
        <div className="space-y-3 w-full md:w-auto md:text-right mt-4 md:mt-0">
          <div className="grid gap-4 md:gap-6 md:justify-end">
            <div className="flex items-center gap-2 text-base md:text-lg whitespace-nowrap">
              <span className="bg-black p-2 rounded-full">
                <Phone
                  size={15}
                  className="text-white fill-white"
                />
              </span>
              <span>{data?.phone ? `+91 ${data.phone}` : "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-base md:text-lg whitespace-nowrap">
              <span className="bg-black p-2 rounded-full">
                <MessageCircle
                  size={15}
                  className="text-white fill-white"
                />
              </span>
              <span>{data?.email ? `+91 ${data.email}` : "N/A"}</span>
            </div>
          </div>
          <p className="text-black mt-2 md:mt-4 text-base md:text-lg flex flex-wrap items-center gap-2">
            Address:
            <span className="font-bold">{data?.address || "N/A"}</span>
          </p>
        </div>
      </div>

      {/* Employment History */}
      <div className="space-y-4 md:space-y-6">
        <h3
          className="text-xl md:text-2xl font-semibold border-b pb-2"
          style={{ borderColor: "gray" }}
        >
          Employment History
        </h3>

        <div className="overflow-y-auto max-h-[40vh] md:max-h-[50vh]">
          <DataTable
            title="Employee History"
            fetcher={async (_page: number, _pageSize: number, _searchInput: string) => {
              if (data && data.rentals && data.rentals.length > 0) {
                return {
                  rows: data.rentals.map((rental) => ({
                    ...rental,
                    totalAmount: rental.totalAmount?.toString() ?? "",
                    advance: rental.advance?.toString() ?? "",
                    status: rental.status as "CREATED" | "COMPLETED" | "INPROGRESS" | "CANCELLED"
                  })),
                  total: data.rentals.length
                };
              }
              return { rows: [], total: 0 };
            }}
            queryKey={["customerRental", customerId]}
            getColumns={CustomerRentalsCol}
          />
        </div>
      </div>
    </div>
  );
}