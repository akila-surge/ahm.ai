import { z } from 'zod';

/**
 * Validated, type-safe environment variables for the web app.
 * Throws at startup if any required variable is missing or malformed —
 * so you catch config mistakes in CI, not in production.
 *
 * Add new variables here as the project grows.
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .url('NEXT_PUBLIC_API_URL must be a valid URL')
    .default('http://localhost:3001/api'),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('Sears'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment configuration. Check your .env file.');
}

export const env = parsed.data;

export type Env = typeof env;
