/**
 * Service implementains
 *
 * Operations on repositories
 * Export methods to other domains
 */
import { Transaction } from 'postgres';
import { UserModel } from '../models/user.model.ts';
import { CreateUserRequest } from '../types/create-user.request.ts';
import { UserExistsError } from "../errors/user-exists.error.ts";
import { DeleteUserRequest } from "../types/delete-user.request.ts";
import { DeleteUserResponse } from "../types/delete-user.response.ts";
import { Database } from "denodb";

export class UserService {
  constructor(private database: Database) { }

  async createUser(payload: CreateUserRequest): Promise<UserModel> {
    try {
      const user = await UserModel.create({
        username: payload.username,
        email: payload.email
      });
      return user;
    } catch (error) {
      console.log(error)
      throw new UserExistsError();
    }
  }

  async getUsers(): Promise<UserModel[]> {
    try {
      const users = await UserModel.all()
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(payload: DeleteUserRequest): Promise<DeleteUserResponse> {
    try {
      await UserModel.where('id', payload.id).delete();
      return { status: 'ok', message: "User deleted successfully" };
    } catch (error) {
      console.log(error)
      throw new UserExistsError();
    }
  }
}
