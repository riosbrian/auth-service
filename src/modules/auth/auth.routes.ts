import { Router } from 'express';
import { validate } from '#src/app/middlewares/validate.js';
import { signupHandler } from '#src/modules/auth/controllers/signup.controller.js';
import { RegisterUserSchema } from '#src/modules/auth/dtos/register-user.dto.js';

const authRouter: Router = Router();

authRouter.post('/signup', validate({ body: RegisterUserSchema }), signupHandler);

export default authRouter;
