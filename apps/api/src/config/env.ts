import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().min(24).default("local-dev-secret-change-before-prod"),
  JWT_EXPIRES_IN: z.string().default("1h"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  AI_PROVIDER: z.enum(["deterministic", "openai", "gemini"]).default("deterministic")
});

export const env = envSchema.parse(process.env);
