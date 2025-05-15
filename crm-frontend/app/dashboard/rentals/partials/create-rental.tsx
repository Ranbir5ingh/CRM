"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Loader, Eye, UserPlus, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { createRentalSchema, CreateRentalDto } from "../rentals.schema";
import { useEffect, useState, useTransition } from "react";
import FileUploadPlaceholder from "@/components/file-upload-placeholder";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCustomerDialogBox from "./add-customer-vehicle";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { customerData, vehicleData } from "../rental.dto";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useDebounce from "@/components/Debouncehook";
import { useQuery } from "@tanstack/react-query";
import {
  getCustomerByNameOrphone,
  getVehicleByModalOrBrand,
} from "../rentals.api";
import { useAxios } from "@/services/axios/axios.hook";
import { toast } from "react-toastify";
import { fetchCustomers } from "../../customers/customer.api";
import { fetchVehicle } from "../../vehicles/vehicle.api";

interface AddCustomerDialogBoxProps {
  initialData?: CreateRentalDto & { image: string };
  onSubmit: (data: CreateRentalDto) => Promise<void>;
  submitLabel: string;
  title: string;
}

export function CreateRentalForm({
  initialData,
  onSubmit,
  submitLabel,
  title,
}: AddCustomerDialogBoxProps) {
  const today = new Date();
  const minStartDate = new Date(today.setFullYear(today.getFullYear()));
  const minEndDate = new Date(today.setDate(today.getDate() + 1));

  const [openCustomer, setOpenCustomer] = useState<customerData | null>(null);
  const [openVehicle, setOpenVehicle] = useState<vehicleData | null>(null);
  const [customers, setCustomers] = useState<customerData[] | []>([]);
  const [vehicles, setVehicles] = useState<vehicleData[] | []>([]);
  const [customerSearch, setCustomerSearch] = useState<string>("");
  const [vehicleSearch, setVehicleSearch] = useState<string>("");

  const [dueAmount, setDueAmount] = useState(0);

  const [addCustomerDialogOpen, setAddCustomerDialogOpen] = useState(false);
  const [addVehicleDialogOPen, setAddVehicleDialogOPen] = useState(false);

  const vehicleDebounce = useDebounce(vehicleSearch, 1000);
  const customerDebounce = useDebounce(customerSearch, 1000);

  const [isPending, startTransition] = useTransition();
  const [isLoading, startFetchingTransition] = useTransition();

  const { axios } = useAxios();

  const form = useForm<CreateRentalDto>({
    resolver: zodResolver(createRentalSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          title: "",
          description: "",
          advance: 0,
          totalAmount: 0,
          startDate: minStartDate.toISOString(),
          endDate: minEndDate.toISOString(),
        },
    mode: "onChange",
  });

  async function handleSubmit(data: CreateRentalDto) {
    startTransition(async () => {
      console.log(data);
      await onSubmit(data);
    });
  }

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
  };

  const fetchFilteredCustomer = async () => {
    startFetchingTransition(async () => {
      try {
        const res = await getCustomerByNameOrphone(axios, customerDebounce);
        if (res.length > 0) setCustomers(res);
      } catch (error: any) {
        toast("Failed to Search Customers");
      }
    });
  };

  const fetchFilteredVehicle = async () => {
    startFetchingTransition(async () => {
      try {
        const res = await getVehicleByModalOrBrand(axios, vehicleDebounce);
        if (res.length > 0) setVehicles(res);
      } catch (error: any) {
        toast("Failed to Search Vehicles");
      }
    });
  };

  let totalAmount = form.watch("totalAmount");
  let endDate = form.watch("endDate");
  let startDate = form.watch("startDate");
  let advance = form.watch("advance");

  useEffect(() => {
    if (!openVehicle) return;

    const dayDifference = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    let calculateTotalAmount = openVehicle.rental_price_per_day;

    if (dayDifference > 0) {
      calculateTotalAmount = openVehicle?.rental_price_per_day * dayDifference;
    }

    form.setValue("totalAmount", calculateTotalAmount);
  }, [endDate, startDate, openVehicle]);

  useEffect(() => {
    if (totalAmount <= 0) return;
    if (advance === undefined || advance > totalAmount) {
      form.setError("advance", {
        type: "manual",
        message: "Advance amount is invalid",
      });
    } else {
      setDueAmount(totalAmount - advance);
    }
  }, [advance, totalAmount]);

  useEffect(() => {
    fetchFilteredCustomer();
  }, [customerDebounce]);
  useEffect(() => {
    fetchFilteredVehicle();
  }, [vehicleDebounce]);

  useEffect(() => {
    if (openCustomer) form.setValue("customerId", openCustomer.id);
    if (openVehicle) form.setValue("vehicleId", openVehicle.id);
  }, [openCustomer, openVehicle]);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 bg-white text-black rounded-lg">
      <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-500 pb-2">
        {title}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, onError)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-20">
            <div className="space-y-4">
              <Dialog
                modal={false}
                open={addCustomerDialogOpen}
                onOpenChange={setAddCustomerDialogOpen}
              >
                <DialogTrigger
                  asChild
                  onClick={() => setAddCustomerDialogOpen(true)}
                >
                  {false ? (
                    <Card className="rounded-lg shadow-md overflow-hidden h-20">
                      <Skeleton className="w-full h-full" />
                    </Card>
                  ) : (
                    <Card className="rounded-lg shadow-md overflow-hidden">
                      <div className="flex items-center justify-between w-full h-full pl-3 sm:pl-4">
                        <div className="font-semibold text-lg sm:text-xl md:text-2xl h-full truncate">
                          {openCustomer ? (
                            <p className="flex flex-col justify-between gap-2 sm:gap-3 md:gap-4 h-full py-2">
                              <span className="truncate">{openCustomer.full_name}</span>
                              <span className="font-medium text-sm sm:text-base md:text-lg truncate">
                                {openCustomer.phone}
                              </span>
                            </p>
                          ) : (
                            "Add Customer"
                          )}
                        </div>

                        <div className="p-2 sm:p-3 md:p-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex justify-center items-center bg-gray-200 rounded-full overflow-hidden">
                            {openCustomer ? (
                              <Avatar className="h-full w-full">
                                <AvatarImage
                                  src={openCustomer.profile}
                                  alt={openCustomer.full_name}
                                />
                                <AvatarFallback>
                                  {openCustomer.full_name[0]}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 stroke-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </DialogTrigger>
                <DialogContent className="w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-[95vw] bg-white text-black">
                  <DialogTitle className="hidden"></DialogTitle>
                  <AddCustomerDialogBox
                    onCustomerSubmit={setOpenCustomer}
                    title="Add Customer"
                    submitLabel="submit"
                    setSearch={setCustomerSearch}
                    isFetching={isLoading}
                    customerData={customers}
                    setDialogClose={setAddCustomerDialogOpen}
                  />
                </DialogContent>
              </Dialog>
              <Dialog
                modal={false}
                open={addVehicleDialogOPen}
                onOpenChange={setAddVehicleDialogOPen}
              >
                <DialogTrigger
                  asChild
                  onClick={() => setAddVehicleDialogOPen(true)}
                >
                  {false ? (
                    <Card className="rounded-lg shadow-md overflow-hidden h-20">
                      <Skeleton className="w-full h-full" />
                    </Card>
                  ) : (
                    <Card className="rounded-lg shadow-md overflow-hidden">
                      <div className="flex items-center justify-between w-full h-full pl-3 sm:pl-4">
                        <div className="font-semibold text-lg sm:text-xl md:text-2xl h-full truncate">
                          {openVehicle ? (
                            <p className="flex flex-col justify-between gap-2 sm:gap-3 md:gap-4 h-full py-2">
                              <span className="truncate">
                                {openVehicle.brand + "-" + openVehicle.model}
                              </span>
                              <span className="font-medium text-sm sm:text-base md:text-lg truncate">
                                {openVehicle.vehicle_number}
                              </span>
                            </p>
                          ) : (
                            "Add Vehicle"
                          )}
                        </div>

                        <div className="p-2 sm:p-3 md:p-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex justify-center items-center bg-gray-200 rounded-full overflow-hidden">
                            {openVehicle ? (
                              <Avatar className="h-full w-full">
                                <AvatarImage
                                  src={openVehicle.vehicle_image}
                                  alt={openVehicle.brand}
                                />
                                <AvatarFallback>
                                  {openVehicle.brand[0]}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <PlusCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 stroke-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </DialogTrigger>
                <DialogContent className="w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-[95vw] bg-white text-black">
                  <DialogTitle className="hidden"></DialogTitle>
                  <AddCustomerDialogBox
                    onVehicleSubmit={setOpenVehicle}
                    vehicleData={vehicles}
                    title="Add Vehicle"
                    submitLabel="Submit"
                    setSearch={setVehicleSearch}
                    isFetching={isLoading}
                    setDialogClose={setAddVehicleDialogOPen}
                  />
                </DialogContent>
              </Dialog>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base sm:text-lg">Title</FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          placeholder="Enter name"
                          {...field}
                          className="pl-8 bg-gray-100"
                        />
                        <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base sm:text-lg">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Address"
                        className="resize-none bg-gray-100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="font-bold text-base sm:text-lg">Start Date</p>
                        <FormControl>
                          <Input
                            type="date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : minStartDate.toISOString().split("T")[0]
                            }
                            className="bg-gray-300 grid"
                            onInput={(e: any) => {
                              const inputValue = e.target.value;
                              const selectedDate = new Date(inputValue);
                              field.onChange(selectedDate?.toISOString());
                            }}
                          />
                        </FormControl>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="font-bold text-base sm:text-lg">End Date</p>
                        <FormControl>
                          <Input
                            type="date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : minEndDate.toISOString().split("T")[0]
                            }
                            className="bg-gray-300 grid"
                            onInput={(e: any) => {
                              const inputValue = e.target.value;
                              const selectedDate = new Date(inputValue);
                              field.onChange(selectedDate?.toISOString());
                            }}
                          />
                        </FormControl>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="advance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base sm:text-lg">
                      Advance
                    </FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          type="number"
                          placeholder="Advance Payment"
                          {...field}
                          className="pl-8 bg-gray-100"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-4">
                <div className="flex justify-between gap-4 items-center">
                  <h2 className="font-bold">Total Amount:</h2>
                  <p className="font-bold text-lg sm:text-xl">{totalAmount}</p>
                </div>
                <div className="flex justify-between gap-4 items-center">
                  <h2 className="font-bold">Due Amount:</h2>
                  <p className="font-bold text-lg sm:text-xl">{dueAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
            <Button
              type="submit"
              onClick={() => form.handleSubmit(onSubmit)}
              className="w-full sm:w-80 bg-black text-white hover:bg-gray-700 font-bold py-2.5"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="animate-spin" size={20} />
                  <span>{submitLabel == "Update" ? "Updating" : "Creating"}</span>
                </div>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}