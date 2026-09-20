import { ApiError } from "../utils/api-error.js";

export function validateBody(schema) {
  return function validateRequestBody(req, _res, next) {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      next(new ApiError(400, "Request validation failed", "VALIDATION_ERROR", details));
      return;
    }

    req.validatedBody = parsed.data;
    next();
  };
}
