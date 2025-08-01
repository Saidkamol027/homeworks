import { Injectable } from '@nestjs/common';

export interface IUser {
  id: number;
  name: string;
}

@Injectable()
export class AppService {
  private users: IUser[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];
  getAllUsers(): IUser[] {
    return this.users;
  }

  getUserById(id: number): IUser | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: IUser) {
    this.users.push(user);
    return this.users;
  }

  updateUser(id: number, user: IUser): IUser[] {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return this.users;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }
}
