import { Logger } from "../../../shared/utils/logger.ts";
import { UserExistsError } from "../errors/user-exists.error.ts";
import { UserModel } from "../models/user.model.ts";
import { CreateUserRequest } from "../types/create-user.request.ts";

interface CreateUserCaseDependencies {
  logger: Logger;
}

export class CreateUserCase {
  constructor(private readonly dependencies: CreateUserCaseDependencies) {}

  execute(_payload: CreateUserRequest): Promise<UserModel> {
    this.dependencies.logger.debug("CreateUserCase");
    throw new UserExistsError()
    // const user = UserModel.create(payload);
    // return user;
  }
}