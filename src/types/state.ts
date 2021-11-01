import { Transaction, PoolClient } from "postgres";
import { Logger } from "../shared/utils/logger.ts";

export interface AppState {
  requestId : string;
  logger: Logger;
  databaseTransaction: Transaction;
  databaseClient: PoolClient;
}
