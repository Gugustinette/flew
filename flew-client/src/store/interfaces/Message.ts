/**
 * Message Interface
 */

import { IUser } from "./User";

export interface IMessage {
  _id: string;
  content: string;
  user: IUser;
  createdAt: string;
  sameUser: boolean;
}

export interface IGetMessages {
  roomId: string;
}

export interface ISendMessage {
  categoryId: string;
  roomId: string;
  content: string;
}
