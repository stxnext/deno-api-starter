import { Middleware } from "oak";
import { AppState } from "../../types/state.ts";

export const requestIdMiddleware: Middleware<AppState> = (ctx, next) => {
  ctx.state.requestId = crypto.randomUUID();
  return next();
}