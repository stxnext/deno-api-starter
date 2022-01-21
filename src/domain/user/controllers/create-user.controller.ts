import { Context } from "oak";
import { AppState } from "../../../types/state.ts";
import { CreateUserRequest } from "../types/create-user.request.ts";
import { CreateUserCase } from "../use-cases/create-user.case.ts";
import { UserService } from '../services/user.service.ts'


export class CreateUserController {
  async handle(context: Context<AppState>) {
    context.state.logger.debug("CreateUserController");
    const body = await context.request.body({type: "json"}).value as CreateUserRequest;
    const user = await new CreateUserCase(context, new UserService(context.state.databaseClient)).execute(body);
    context.response.status = 201;
    context.response.body = JSON.stringify(user);
  }
}
