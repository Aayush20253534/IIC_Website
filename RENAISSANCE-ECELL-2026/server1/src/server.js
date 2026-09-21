import { createServer } from "node:http";
import { app } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const httpServer = createServer(app);
let shuttingDown = false;

async function start() {
  try {
    await connectDatabase();

    httpServer.listen(env.PORT, () => {
      logger.info({ port: env.PORT }, "Renaissance server1 listening");
    });
  } catch (error) {
    logger.fatal({ err: error }, "Failed to start Renaissance server1");
    process.exitCode = 1;
  }
}

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  logger.info({ signal }, "Graceful shutdown started");

  const forceExitTimer = setTimeout(() => {
    logger.fatal("Graceful shutdown timed out; forcing exit");
    process.exit(1);
  }, 10000);
  forceExitTimer.unref();

  httpServer.close(async (serverError) => {
    try {
      await disconnectDatabase();
    } catch (databaseError) {
      logger.error({ err: databaseError }, "Failed to disconnect MongoDB cleanly");
      process.exitCode = 1;
    }

    if (serverError) {
      logger.error({ err: serverError }, "HTTP server shutdown failed");
      process.exitCode = 1;
    }

    clearTimeout(forceExitTimer);
    logger.info("Graceful shutdown complete");
    process.exit(process.exitCode || 0);
  });
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("unhandledRejection", (reason) => {
  logger.error({ err: reason }, "Unhandled promise rejection");
  void shutdown("unhandledRejection");
});
process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught exception");
  void shutdown("uncaughtException");
});

await start();
