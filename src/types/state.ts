import { Logger } from "../shared/utils/logger.ts";
import { Database } from "denodb";

export interface AppState {
  requestId: string;
  logger: Logger;
  databaseClient: Database;
}
