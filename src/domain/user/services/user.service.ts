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

export class UserService {
  constructor(private transaction: Transaction) {}

  async createUser(payload: CreateUserRequest): Promise<UserModel> {
    try {
      console.log(await this.transaction.name);
      await this.transaction.begin();
      await this.transaction.queryObject(`INSERT INTO users (username, email) VALUES ($1, $2)`, payload.userName, payload.email);
      const id = (
        await this.transaction.queryObject<{ currval: BigInt }>(`SELECT currval('users_id_seq')`)
      ).rows[0].currval;
      await this.transaction.commit();
      const user = new UserModel({ id: id.toString(), ...payload });
      return user;
    } catch (error) {
      console.log(error)
      throw new UserExistsError();
    }
  }

  async getUsers(): Promise<UserModel[]> {
    try {
      await this.transaction.begin();
      const users = await this.transaction.queryObject<UserModel>('SELECT * FROM users');
      return users.rows;
    } catch (error) {
      throw new Error(error);
    }
  }
}
