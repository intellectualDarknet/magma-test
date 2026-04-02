import { User } from 'schemas/user.schema';

export class UserEntity {
  email: string;
  name: string
  id: string;
  createdAt: Date

  static to(user: User) {
    if ("_id" in user) {
       return {
            email: user.email,
            name: user.name,
            id: user._id as unknown as string,
            createdAt: user.createdAt
       }
    }
    throw Error('The user is not valid');
  }
}