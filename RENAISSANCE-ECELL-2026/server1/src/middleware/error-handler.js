import { env } from "../config/env.js";

export function errorHandler(error, req, res, _next) {
  if (error?.code === 11000) {
    error.statusCode = 409;
    error.code = "DUPLICATE_RESOURCE";
    error.message = "A resource with the same unique value already exists";
    error.details = { fields: Object.keys(error.keyPattern || error.keyValue || {}) };
  } else if (error?.name === "ValidationError") {
    error.statusCode = 400;
    error.code = "MODEL_VALIDATION_ERROR";
    error.details = Object.values(error.errors || {}).map((item) => ({
      path: item.path,
      message: item.message,
    }));
  }

  const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
  const isServerError = statusCode >= 500;

  req.log?.[isServerError ? "error" : "warn"](
    { err: error, statusCode },
    isServerError ? "Request failed" : "Request rejected",
  );

  const payload = {
    success: false,
    error: {
      code: error.code || "INTERNAL_SERVER_ERROR",
      message: isServerError && env.NODE_ENV === "production"
        ? "An unexpected server error occurred"
        : error.message,
      requestId: req.id,
    },
  };

  if (error.details !== undefined) {
    payload.error.details = error.details;
  }

  if (env.NODE_ENV !== "production" && error.stack) {
    payload.error.stack = error.stack;
  }

  res.status(statusCode).json(payload);
}
