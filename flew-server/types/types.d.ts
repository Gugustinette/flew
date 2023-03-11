
// Custom request interface
import { Request } from 'express';

import { IFlew } from '../models/Flew';
import { ICategory } from '../models/Category';
import { IRoom } from '../models/Room';

export interface IRequest extends Request {
    user: {
        _id: string;
    },
    flew: IFlew,
    category: ICategory,
    room: IRoom,
    query: any,
}
