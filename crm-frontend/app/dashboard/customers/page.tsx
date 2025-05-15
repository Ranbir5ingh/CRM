"use client";

import { DataTable } from "@/components/CommonTable";
import { createCustomer, fetchCustomers } from "./customer.api";
import { useAxios } from "@/services/axios/axios.hook";
import React from "react";
import { CustomerDataCol } from "./customers.constant";
import  CreateCustomerForm  from "./partials/create-cutomer-form";
import { toast } from "react-toastify";
import { CreateCustomerDto } from "./customer.schema";

export default function Customers() {
  const { axios } = useAxios();
  const [createEntryDialogOpen, setCreateEntryDialogOpen] = React.useState(false);

  function createCustomerDialog({ refetch: refetchTableData }: { refetch: () => void }) {
    async function handleAddCustomers(data: CreateCustomerDto) {
      try {
        const response = await createCustomer(axios, data);
        if (response) {
          toast.success("Customer Created successfully");
        }
      } catch (error) {
        toast.error((error as Error)?.message ?? "Something went wrong");
      } finally {
        setCreateEntryDialogOpen(false);
        refetchTableData();
      }
    }

    return (
      <div className="w-full max-h-[90vh] overflow-y-auto">
        <CreateCustomerForm
          onSubmit={handleAddCustomers}
          title={"Create Customer"}
          submitLabel="Create"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Customer Management</h1>
      
      <DataTable
        title="Customers"
        fetcher={async (page, pageSize, searchquery) => {
          return await fetchCustomers(axios, page, pageSize, searchquery);
        }}
        queryKey={["customers"]}
        getColumns={CustomerDataCol}
        CreateEntryComponent={createCustomerDialog}
        createEntryDialogOpen={createEntryDialogOpen}
        setCreateEntryDialogOpen={setCreateEntryDialogOpen}
      />
    </div>
  );
}