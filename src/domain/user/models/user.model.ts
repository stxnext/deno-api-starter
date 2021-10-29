interface UserPayload {
  id: string;
  userName: string;
  email: string;
}

export class UserModel {
  constructor(payload: UserPayload) {
    const { id, userName, email } = payload;
    this.id = id;
    this.userName = userName;
    this.email = email;
  }

  public readonly id: string;
  public readonly userName: string;
  public readonly email: string;

  static create(payload: Omit<UserPayload, "id"> & Partial<UserPayload>): UserModel {
    if(payload.id) return new UserModel(payload as UserPayload);
    const id = crypto.randomUUID();
    return new UserModel({
      ...payload,
      id,
    })
  }
}