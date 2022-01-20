import { Context } from "oak";
import { UserModel } from "../models/user.model.ts";
import { AppState } from '../../../types/state.ts';
import { UserService } from '../services/user.service.ts'

export class GetUsersCase {
  constructor(private readonly dependencies: Context<AppState>, private readonly userService: UserService) {}

  async execute(): Promise<UserModel[]> {
    this.dependencies.state.logger.debug("CreateUserCase");
    const user = await this.userService.getUsers();
    return user;
  }
}
