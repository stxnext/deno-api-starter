import { Middleware } from "oak";
import { AppState } from "../../types/state.ts";
import { Database } from "denodb";

export const databaseMiddleware = (database: Database): Middleware<AppState> => (ctx, next) => {
  ctx.state.databaseClient = database;
  return next();
}