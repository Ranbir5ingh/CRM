import { z } from "zod";




export const createRentalSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    customerId: z.string().uuid(),
    vehicleId: z.string().uuid(),
    startDate: z.string(),
    endDate: z.string(),
    totalAmount: z.coerce.number().positive(),
    advance: z.coerce.number().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start < end;
    },
    {
      message: "Start date must be before end Data",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.advance === undefined) return true;
      return data.advance <= data.totalAmount;
    },
    {
      message: "Advance amount must be less than totalAmount",
    }
  );


export type CreateRentalDto = z.infer<typeof createRentalSchema>;
