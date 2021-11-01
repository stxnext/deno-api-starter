import { Middleware } from "oak";
import { AppState } from "../../types/state.ts";
import { Database } from "../utils/database.ts";

export const databaseMiddleware = (database: Database): Middleware<AppState> => async (ctx, next) => {
  ctx.state.databaseClient = await database.getClient();
  ctx.state.databaseTransaction = database.createTransaction({
    requestId: ctx.state.requestId,
    client: ctx.state.databaseClient,
  });
  return next();
}