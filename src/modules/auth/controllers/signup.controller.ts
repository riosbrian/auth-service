import type { RequestHandler } from 'express';
import type { ValidatedRequestLocals } from '#src/app/middlewares/validate.js';
import type { RegisterUserSchema } from '#src/modules/auth/dtos/register-user.dto.js';
import { registerUser } from '#src/modules/auth/services/register.service.js';

type SignupSchema = { body: typeof RegisterUserSchema };

export const signupHandler: RequestHandler<
  Record<string, string>,
  unknown,
  unknown,
  Record<string, unknown>,
  ValidatedRequestLocals<SignupSchema>
> = async (_req, res, _next) => {
  const input = res.locals.validatedRequest.body;
  await registerUser(input);
  res.status(201).json({ status: 'ok', message: 'User registered successfully' });
};
