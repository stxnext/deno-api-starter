import { Context } from "oak";
import { AppState } from '../../../types/state.ts';
import { UserService } from '../services/user.service.ts'
import { DeleteUserRequest } from "../types/delete-user.request.ts";
import { DeleteUserResponse } from "../types/delete-user.response.ts";

export class DeleteUserCase {
  constructor(private readonly dependencies: Context<AppState>, private readonly userService: UserService) {}

  async execute(payload: DeleteUserRequest): Promise<DeleteUserResponse> {
    this.dependencies.state.logger.debug("DeleteUserCase");
    const response = await this.userService.deleteUser(payload);
    return response;
  }
}
