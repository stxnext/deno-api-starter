import { Context } from "oak";
import { UserModel } from "../models/user.model.ts";
import { CreateUserRequest } from "../types/create-user.request.ts";
import { AppState } from '../../../types/state.ts';
import { UserService } from '../services/user.service.ts'

export class CreateUserCase {
  constructor(private readonly dependencies: Context<AppState>, private readonly userService: UserService) {}

  async execute(payload: CreateUserRequest): Promise<UserModel> {
    this.dependencies.state.logger.debug("CreateUserCase");
    const user = await this.userService.createUser(payload);
    return user;
  }
}
