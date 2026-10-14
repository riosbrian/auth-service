import { z } from 'zod';

export const LoginUserSchema = z.strictObject({
  email: z.string().trim().pipe(z.email()),
  password: z.string().min(8),
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;
