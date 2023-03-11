/**
 * Room Interface
 */

import { IUser } from "./User";
import { IMessage } from "./Message";

export interface IRoom {
  _id: string;
  name: string;
  category: string;
  messages: IMessage[];
  users: IUser[];
}

export interface ICreateRoom {
  userId: string;
  flewId: string;
  categoryId: string;
  name: string;
}

export interface IDeleteRoom {
  userId: string;
  flewId: string;
  roomId: string;
}
