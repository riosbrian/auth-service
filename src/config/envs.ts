import { boolean, z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  SHUTDOWN_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),
  CORS_ORIGINS: z
    .string()
    .default('')
    .transform((val) =>
      val
        .split(',')
        .map((s) => s.trim())
        .filter(boolean),
    ),
  RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(15 * 60 * 1000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(300),
});

const parse = envSchema.safeParse(process.env);

if (!parse.success) {
  console.error('Invalid environment variables', parse.error.issues);
  process.exit(1);
}

export const envs = parse.data;
