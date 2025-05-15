"use client";
import React, { useState, useCallback } from "react";
import { DataTable } from "@/components/CommonTable";
import { createVehicle, fetchVehicle } from "./vehicle.api";
import { useAxios } from "@/services/axios/axios.hook";
import { VehicleDataCol } from "./vehicle.constant";
import CreateVehicleForm from "./partials/create-vehicle-form";
import { toast } from "react-toastify";
import { CreateVehicleDto } from "./vehicle.schema";

export default function Vehicles() {
  const { axios } = useAxios();
  const [createVehicleDialogOpen, setCreateVehicleDialogOpen] = useState(false);

  const CreateVehicleComponent = useCallback(
    ({ refetch: refetchVehicleData }: { refetch: any }) => {
      const submitVehicleHandler = async (data: CreateVehicleDto) => {
        try {
          const response = await createVehicle(axios, data);
          if (response) toast.success("Vehicle Added Successfully");
        } catch (error: any) {
          toast.error(error.message + " something went wrong");
        } finally {
          setCreateVehicleDialogOpen(false);
          refetchVehicleData();
        }
      };

      return (
        <CreateVehicleForm
          title="Create Vehicle"
          submitLabel="Submit"
          onSubmit={submitVehicleHandler}
        />
      );
    },
    [axios]
  );

  return (
    <DataTable
      title="Vehicles"
      fetcher={async (page, pageSize, searchInput) => {
        return await fetchVehicle(axios, page, pageSize, searchInput);
      }}
      queryKey={["Vehicles"]}
      getColumns={VehicleDataCol}
      CreateEntryComponent={CreateVehicleComponent}
      createEntryDialogOpen={createVehicleDialogOpen}
      setCreateEntryDialogOpen={setCreateVehicleDialogOpen}
    />
  );
}