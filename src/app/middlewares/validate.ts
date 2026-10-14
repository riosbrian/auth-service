import type { RequestHandler } from 'express';
import type { output, ZodType } from 'zod';
import { InvalidRequestError } from '#src/shared/errors/app-error.js';

const INPUT_LOCATIONS = ['body', 'params', 'query'] as const;

type InputLocation = (typeof INPUT_LOCATIONS)[number];

type ValidationRules = Partial<Record<InputLocation, ZodType>>;

export type ValidatedRequest<Schema extends ValidationRules> = {
  [K in keyof Schema]: Schema[K] extends ZodType ? output<Schema[K]> : never;
};

export type ValidatedRequestLocals<Schema extends ValidationRules> = {
  validatedRequest: ValidatedRequest<Schema>;
};

export function validate<Schema extends ValidationRules>(
  schemas: Schema,
): RequestHandler<
  Record<string, string>,
  unknown,
  unknown,
  Record<string, unknown>,
  ValidatedRequestLocals<Schema>
> {
  return async (req, res, next) => {
    const validatedRequest: Partial<Record<InputLocation, unknown>> = {};

    for (const location of INPUT_LOCATIONS) {
      const schema = schemas[location];
      if (!schema) continue;

      const parsed = schema.safeParse(req[location]);
      if (!parsed.success) throw new InvalidRequestError();

      validatedRequest[location] = parsed.data;
    }
    res.locals.validatedRequest = validatedRequest as ValidatedRequest<Schema>;
    next();
  };
}
