/**
 * Authentication strategy
 * Used to authenticate a user
 * @module strategies/auth
 * @requires jsonwebtoken
*/

import { IRequest } from '../types/types';
import { Response, NextFunction } from 'express';
import { IUserProfile } from '../models/UserProfile';

import jwt from 'jsonwebtoken';
const keyToken = 'CS969dVVN70s2vWD5pxJUCsRE499308uTacBU179OQ06rgn5oIfZissIK13O7uA7k70Lpr48m3TxgvixGKBCD9OFKEvsQN5kp7J3HTxV7kSk8wuK0446yJGE5MJ4hj90xrQWCi0X2i3XB505wc047A93ekNjhng47meRWyymyuQ1501B2EiR6eovJx5oVEq248p9HI9u';


export default (req: IRequest, res: Response, next: NextFunction) => {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, keyToken) as IUserProfile;
            const userId = decodedToken.userId;

            if (req.body.userId && req.body.userId === userId) {
                req.user = {
                    _id: userId
                };
                next();
            }
            else if (req.query.userId && req.query.userId === userId) {
                req.user = {
                    _id: decodeURIComponent(userId)
                };
                next();
            }
            else
                throw 'Wrong nickname or password';
        }
        else
            throw 'No token provided';

    } catch (error) {
        res.status(419).json({
            message: 'Wrong nickname or password'
        });
    }
};

