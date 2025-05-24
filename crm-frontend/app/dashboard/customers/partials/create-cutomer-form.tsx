"use client";

import React, { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Loader } from "lucide-react";

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

import { CreateCustomerDto, CreateCustomerSchema } from "../customer.schema";
import FileUploadPlaceholder from "@/components/file-upload-placeholder";

interface AddCustomerDialogBoxProps {
  initialData?: CreateCustomerDto & { image: string };
  onSubmit: (data: CreateCustomerDto) => Promise<void>;
  submitLabel: string;
  title: string;
}

function CreateCustomerForm({
  initialData,
  onSubmit,
  submitLabel,
  title,
}: AddCustomerDialogBoxProps) {
  const today = new Date();
  const minDate = new Date(today.setFullYear(today.getFullYear() - 18));
  const [isPending, startTransition] = useTransition();
  const [profile, setProfile] = useState<File | null>(null);
  const [aadharFront, setAadharFront] = useState<File | null>(null);
  const [aadharBack, setAadharBack] = useState<File | null>(null);
  const [drivingLic, setDrivingLic] = useState<File | null>(null);

  const handleSubmit = useCallback(
    async (data: CreateCustomerDto) => {
      startTransition(async () => {
        if (profile) data.profile = profile;
        if (aadharFront) data.aadharFront = aadharFront;
        if (aadharBack) data.aadharBack = aadharBack;
        if (drivingLic) data.drivingLic = drivingLic;

        await onSubmit(data);
      });
    },
    [profile, aadharFront, aadharBack, drivingLic, onSubmit, startTransition]
  );

  const handleProfileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setProfile(file);
      }
    },
    []
  );

  const handleAadharFrontChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setAadharFront(file);
      }
    },
    []
  );

  const handleAadharBackChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setAadharBack(file);
      }
    },
    []
  );

  const handleDrivingLicChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setDrivingLic(file);
      }
    },
    []
  );

  const form = useForm<CreateCustomerDto>({
    resolver: zodResolver(CreateCustomerSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          aadharFront: undefined,
          aadharBack: undefined,
          drivingLic: undefined,
          profile: undefined,
        }
      : {
          full_name: "",
          email: "",
          phone: "",
          address: "",
          date_of_birth: minDate.toISOString(),
          aadhar_number: "",
        },
    mode: "onChange",
  });

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-10 bg-white text-black rounded-lg">
      <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-500 pb-2">
        {title}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Upload Customer Photo
                    </FormLabel>

                    <FormControl>
                      <label className="w-36 h-36 flex flex-col justify-center items-center rounded-full mx-auto cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-500 transition-colors">
                        {initialData?.profile || profile ? (
                          <img
                            src={
                              (profile && URL.createObjectURL(profile)) ??
                              initialData?.profile ??
                              "/placeholder.svg"
                            }
                            alt="Preview"
                            className="h-full w-full aspect-square object-cover rounded-full"
                          />
                        ) : (
                          <FileUploadPlaceholder />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfileChange}
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold  text-lg">
                      Full Name
                    </FormLabel>
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
                name="aadhar_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Aadhar Number
                    </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Aadhar Number"
                  {...field}
                  type="text"
                  maxLength={12}
                  className="bg-gray-100"
                />
              </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dl_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      License Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter License Number"
                        {...field}
                        className="bg-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                key="phone"
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold  text-lg">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          disabled
                          value="+91"
                          className="w-16 bg-gray-100"
                        />
                        <Input
                          {...field}
                          key="phone"
                          placeholder="Enter phone no."
                          type="tel"
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key="email"
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold  text-lg">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        key="email"
                        placeholder="Enter Email"
                        type="email"
                        className="flex-1 bg-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">Address</FormLabel>
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

            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Gender
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-gray-100">
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-gray-100">
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="BLACKLISTED">
                            Blacklisted
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2 md:col-span-1">
                      <FormLabel>
                        <p className="font-bold text-lg">Date of Birth</p>
                        <FormControl>
                          <Input
                            type="date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : minDate.toISOString().split("T")[0]
                            }
                            className="bg-gray-300"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <FormField
                  control={form.control}
                  name="aadharFront"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Upload Addhar Front photo
                      </FormLabel>

                      <FormControl>
                        <label className="block h-[180px] cursor-pointer">
                          <div className="border-2 border-dashed w-full rounded-lg text-center h-full aspect-[3/4] transition-colors flex justify-center items-center">
                            {initialData?.aadharFront || aadharFront ? (
                              <div className="relative w-full  m-auto aspect-video ">
                                <img
                                  src={
                                    (aadharFront &&
                                      URL.createObjectURL(aadharFront)) ??
                                    initialData?.aadharFront ??
                                    "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  className="rounded-md object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <FileUploadPlaceholder />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleAadharFrontChange}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aadharBack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Upload Addhar Back photo
                      </FormLabel>

                      <FormControl>
                        <label className="block h-[180px] cursor-pointer">
                          <div className="border-2 border-dashed w-full rounded-lg text-center h-full aspect-[3/4] transition-colors flex justify-center items-center">
                            {initialData?.aadharBack || aadharBack ? (
                              <div className="relative w-full  m-auto aspect-video ">
                                <img
                                  src={
                                    (aadharBack &&
                                      URL.createObjectURL(aadharBack)) ??
                                    initialData?.aadharBack ??
                                    "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  className="rounded-md object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <FileUploadPlaceholder />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleAadharBackChange}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="drivingLic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Upload driving Licence photo
                    </FormLabel>

                    <FormControl>
                      <label className="block h-[200px] cursor-pointer">
                        <div className="relative border-2 border-dashed w-full rounded-lg text-center h-full overflow-hidden  aspect-[3/4]  transition-colors flex justify-center items-center">
                          {initialData?.drivingLic || drivingLic ? (
                            <div className="relative w-full  m-auto aspect-video  ">
                              <img
                                src={
                                  (drivingLic &&
                                    URL.createObjectURL(drivingLic)) ??
                                  initialData?.drivingLic ??
                                  "/placeholder.svg"
                                }
                                alt="Preview"
                                className="rounded-md object-cover w-full h-full"
                              />
                            </div>
                          ) : (
                            <FileUploadPlaceholder />
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleDrivingLicChange}
                          />
                        </div>
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-center mb-10 mt-6">
            <Button
              type="submit"
              className="w-full sm:w-80 bg-black text-white hover:bg-gray-700 font-bold py-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  {submitLabel == "Update" ? "Updating" : "Submitting"}
                </>
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

export default React.memo(CreateCustomerForm);