import { Middleware } from "oak";
import { AppState } from "../../../types/state.ts";
import { UserExistsError } from "../errors/user-exists.error.ts";

export const userErrorHandler: Middleware<AppState> = async (ctx, next) => {
  try {
    await next();
  } catch (error) {

    if(error instanceof UserExistsError) {
      ctx.state.logger.warning(error);
      ctx.response.status = error.status;
      ctx.response.body = { message: error.message };
    }

    else {
      ctx.response.status = 500;
      ctx.response.body = { message: "Internal server error" };
    }

  }
}