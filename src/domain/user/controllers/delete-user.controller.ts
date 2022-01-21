import { Context } from "oak";
import { AppState } from "../../../types/state.ts";
import { DeleteUserCase } from "../use-cases/delete-user.case.ts";
import { UserService } from '../services/user.service.ts'
import { DeleteUserRequest } from "../types/delete-user.request.ts";


export class DeleteUserController {
  async handle(context: Context<AppState>) {
    context.state.logger.debug("DeleteUserController");
    const body = await context.request.body({ type: "json" }).value as DeleteUserRequest;
    const response = await new DeleteUserCase(context, new UserService(context.state.databaseClient)).execute(body);
    context.response.status = 201;
    context.response.body = JSON.stringify(response);
  }
}
