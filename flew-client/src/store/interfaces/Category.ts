/**
 * Category Interface
 */

import { IRoom } from "./Room";

export interface ICategory {
  _id: string;
  name: string;
  rooms: IRoom[];
}

export interface ICreateCategory {
  userId: string;
  flewId: string;
  name: string;
}

export interface IDeleteCategory {
  userId: string;
  flewId: string;
  categoryId: string;
}
