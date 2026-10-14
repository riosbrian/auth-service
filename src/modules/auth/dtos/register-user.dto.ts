import { z } from 'zod';

export const RegisterUserSchema = z.strictObject({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(8).max(64),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;
