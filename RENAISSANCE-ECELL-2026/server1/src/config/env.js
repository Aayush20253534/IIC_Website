import "dotenv/config";
import { z } from "zod";

const mongoUriSchema = z
  .string()
  .min(1, "MONGODB_URI is required")
  .refine(
    (value) => value.startsWith("mongodb://") || value.startsWith("mongodb+srv://"),
    "MONGODB_URI must start with mongodb:// or mongodb+srv://",
  );

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(5001),
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).max(10).default(0),
  REQUEST_BODY_LIMIT: z.string().min(1).default("1mb"),
  CLIENT_ORIGIN: z.string().min(1, "CLIENT_ORIGIN is required"),
  MONGODB_URI: mongoUriSchema,
  MONGO_SERVER_SELECTION_TIMEOUT_MS: z.coerce.number().int().min(1000).max(60000).default(10000),
  MONGO_MAX_POOL_SIZE: z.coerce.number().int().min(1).max(200).default(20),
  MONGO_MIN_POOL_SIZE: z.coerce.number().int().min(0).max(100).default(0),
  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const message = parsed.error.issues
    .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid server1 environment configuration:\n${message}`);
}

const clientOrigins = parsed.data.CLIENT_ORIGIN
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (clientOrigins.length === 0) {
  throw new Error("CLIENT_ORIGIN must contain at least one allowed origin");
}

export const env = Object.freeze({
  ...parsed.data,
  CLIENT_ORIGINS: clientOrigins,
});
