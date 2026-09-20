import {
  AuthSession,
  CampusAmbassador,
  PromoCode,
  Registration,
  Task,
} from "../models/index.js";
import { logger } from "../utils/logger.js";

const indexedModels = [AuthSession, CampusAmbassador, PromoCode, Registration, Task];

export async function ensureDatabaseIndexes() {
  for (const Model of indexedModels) {
    await Model.createIndexes();
    logger.debug({ model: Model.modelName }, "MongoDB indexes ensured");
  }
}
