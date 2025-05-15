import { EnumLike } from "zod";

export type customerData = {
  id: string;
  profile: string;
  gender: string;
  full_name: string;
  phone: string;
  address: string;
  date_of_birth: string;
};
export type vehicleData = {
  id: string;
  vehicle_number: string;
  vehicle_image: string;
  brand: string;
  model: string;
  color: string;
  seating_capacity: number;
  rental_price_per_day: number;
  vehicle_status: string;
};

export type RentalDto = {
  id: string;
  created_at: string;
  customerId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  advance: number;
  title: string;
  description: string;
  status: "CREATED" | "COMPLETED" | "CANCELLED" | "INPROGRESS" | "DELETED";
  customers: customerData;
  vehicles: vehicleData;
};

export type statusDto =
  | "CREATED"
  | "COMPLETED"
  | "CANCELLED"
  | "INPROGRESS"
  | "DELETED";
