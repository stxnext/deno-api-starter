import { Middleware } from "oak";
import { AppState } from "../../types/state.ts";
import { Database } from "../utils/database.ts";

export const releaseDatabaseMiddleware = (database: Database): Middleware<AppState> => async (ctx, next) => {
  await database.release({
    transaction: ctx.state.databaseTransaction,
    client: ctx.state.databaseClient,
  });
  return next();
}