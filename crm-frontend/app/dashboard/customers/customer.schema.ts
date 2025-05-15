import { z } from 'zod';

export const customerStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'BLACKLISTED']);

export const CreateCustomerSchema = z.object({
  full_name: z.string().optional(),
  email: z.string().email().optional(),
  profile: z.instanceof(File).optional(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Phone number must be a valid 10-digit Indian number')
    .optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  status: customerStatusEnum.optional(),
  aadharFront: z.instanceof(File).optional(),
  aadharBack: z.instanceof(File).optional(),
  drivingLic: z.instanceof(File).optional(),
  is_aadhar_verified: z.boolean().optional(),
  is_driving_licence_verified: z.boolean().optional(),
  date_of_birth: z.string().optional(),
});

export const customerIdSchema = z.object({
  customerId: z.string().uuid(),
});

export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;
export type CustomerId = z.infer<typeof customerIdSchema>;
