import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('3306').transform(Number),
  DB_NAME: z.string().default('smartled_jreda2'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default('Siddik@123'),
  JWT_SECRET: z.string().default('jreda_secret_key_jwt_2026_super_secure_token_key'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

export const env = envSchema.parse(process.env);
