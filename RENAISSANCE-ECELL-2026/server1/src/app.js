import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { requestLogger } from "./middleware/request-context.js";
import { healthRouter } from "./routes/health.routes.js";
import { ApiError } from "./utils/api-error.js";

export const app = express();

app.disable("x-powered-by");
app.set("trust proxy", env.TRUST_PROXY_HOPS > 0 ? env.TRUST_PROXY_HOPS : false);

app.use(requestLogger);
app.use(helmet());
app.use(compression());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
    origin(origin, callback) {
      if (!origin || env.CLIENT_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new ApiError(403, "Origin is not allowed by CORS", "CORS_ORIGIN_DENIED"));
    },
  }),
);
app.use(express.json({ limit: env.REQUEST_BODY_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: env.REQUEST_BODY_LIMIT }));

app.use("/api/v1", healthRouter);

app.use(notFoundHandler);
app.use(errorHandler);
