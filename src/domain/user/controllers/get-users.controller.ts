import { Context } from "oak";
import { AppState } from "../../../types/state.ts";
import { GetUsersCase } from "../use-cases/get-users.case.ts";
import { UserService } from '../services/user.service.ts'


export class GetUsersController {
  async handle(context: Context<AppState>) {
    context.state.logger.debug("GetUsersController");
    const users = await new GetUsersCase(context, new UserService(context.state.databaseTransaction)).execute();
    context.response.body = JSON.stringify(users);
  }
}
