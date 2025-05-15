import { z } from "zod";

export const fuelTypeEnum = z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"]);
export const vehicleStatusEnum = z.enum([
  "AVAILABLE",
  "RENTAL",
  "MAINTENANCE",
  "INACTIVE",
]);

export const createVehicleSchema = z.object({
  vehicle_number: z.string().max(20).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  manufacture_year: z.coerce.number().int().min(1980).optional(),
  color: z.string().optional(),
  vehicle_status: vehicleStatusEnum.optional(),
  fuel_type: fuelTypeEnum.optional(),
  seating_capacity: z.coerce.number().int().min(1).optional(),
  rental_price_per_day: z.coerce.number().positive().optional(),
  mileage: z.coerce.number().optional(),
  insurance_valid_till: z.string().optional(),
  last_service_date: z.string().optional(),
  pollution_valid_date: z.string().optional(),
  vehicle_image: z.instanceof(File).optional(),
  registration_doc: z.instanceof(File).optional(),
});

export type CreateVehicleDto = z.infer<typeof createVehicleSchema>;
