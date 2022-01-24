import { RouteParams, Router } from "oak";
import { CreateUserController } from "./controllers/create-user.controller.ts";
import { GetUsersController } from "./controllers/get-users.controller.ts";
import { AppState } from "../../types/state.ts";
import { DeleteUserController } from "./controllers/delete-user.controller.ts";
import { validatorMiddleware } from "../../shared/middlewares/validation.middleware.ts"
import { CreateUserValidation } from "./validators/create-user.validator.ts"

export const userRouter = new Router<RouteParams, Partial<AppState>>();

userRouter
  .use((ctx, next) => {
    ctx.state.logger!.debug("User router");
    return next();
  })
  .get("/users", new GetUsersController().handle)
  .post("/user", validatorMiddleware<AppState>(CreateUserValidation), new CreateUserController().handle)
  .delete("/user", new DeleteUserController().handle)
