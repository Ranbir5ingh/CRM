"use client";

import RentalsDetailView from "./partials/view-rental";
import { use, useEffect, useState, useTransition } from "react";
import { useAxios } from "@/services/axios/axios.hook";
import { RentalDto, statusDto } from "../../rental.dto";
import {
  changeRentalStatus,
  deleteRental,
  getRentalById,
} from "../../rentals.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RentalsView({
  params,
}: {
  params: Promise<{ rentalId: string }>;
}) {
  const { rentalId } = use(params);
  const [rentalData, setRentalData] = useState<RentalDto | null>(null);
  const [isLoading, startTransition] = useTransition();
  const [isPending, startSubmitTransition] = useTransition();
  const { axios } = useAxios();
  const router = useRouter();

  function toastMessages(message: string) {
    switch (message) {
      case "INPROGRESS":
        toast.success("Rental is Started Successfully");
        break;
      case "COMPLETED":
        toast.success("Rental is Completed Successfully");
        break;
      case "CANCELLED":
        toast.success("Rental is Cancelled Successfully");
        break;
      case "DELETED":
        toast.success("Rental is Deleted Successfully");
        break;

      default:
        break;
    }
  }

  const changeStatusHandler = async (status: statusDto) => {
    startSubmitTransition(async () => {
      try {
        const res = await changeRentalStatus(axios, status, rentalId);
        if (res) toastMessages(status);
      } catch (error) {
        toast("something went wrong");
      } finally {
        fetchData();
      }
    });
  };

  const fetchData = async () => {
    startTransition(async () => {
      try {
        const res = await getRentalById(axios, rentalId);
        if (res) setRentalData(res);
      } catch (error) {
        toast.error("Error loading data");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [rentalId]);

  return (
    <RentalsDetailView
      rentalData={rentalData}
      isLoading={isLoading}
      isPending={isPending}
      changeStatusHandler={changeStatusHandler}
    />
  );
}
