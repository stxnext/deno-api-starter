import { HttpError, Status } from "oak";

export class UserExistsError extends HttpError {
  public status: Status = Status.Conflict;

  constructor() {
    super("User already exists")
  }
}