import { DataTypes, Model } from 'denodb';

export interface UserPayload {
  id: string;
  username: string;
  email: string;
}
export class UserModel extends Model {
  static table = 'users';
  static timestamps = true;
  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
  };
}
