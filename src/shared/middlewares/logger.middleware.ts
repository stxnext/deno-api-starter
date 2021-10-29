import { Middleware } from "oak";
import { AppState } from "../../types/state.ts";
import { Logger, LogLevel } from "../utils/logger.ts";


export const loggerMiddleware = (logLevel: LogLevel): Middleware<AppState> => (ctx, next) => {
  const logger = new Logger({logLevel, requestId: ctx.state.requestId});
  ctx.state.logger = logger;
  return next();
}