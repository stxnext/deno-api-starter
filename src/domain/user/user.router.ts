import { RouteParams, Router } from "oak";
import { CreateUserController } from "./controllers/create-user.controller.ts";
import { userErrorHandler } from "./utils/user.error-handler.ts";
import { AppState } from "../../types/state.ts";


export const userRouter = new Router<RouteParams, Partial<AppState>>();

userRouter
  .use((ctx, next) => {
    ctx.state.logger!.debug("User router");
    return next();
  })
  .use(userErrorHandler)
  .post("/user", new CreateUserController().handle)
