import { z } from "zod";

export const financeEnum = z.enum(["EXPENSE", "INCOME"]);
export const expenseSchema = z.object({
  description: z.string().min(5, {
    message: "Description is required",
  }),
  amount: z.coerce
    .number()
    .min(1, {
      message: "Amount is required",
    })
    .max(100000, {
      message: "Amount is too high",
    }),
  type: financeEnum.optional(),
});

export type expenseDto = z.infer<typeof expenseSchema>;
