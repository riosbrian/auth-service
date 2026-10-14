import { Router } from 'express';
import authRouter from '#src/modules/auth/auth.routes.js';

const appRouter: Router = Router();

appRouter.use('/auth', authRouter);

export default appRouter;
