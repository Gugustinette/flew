/**
 * Room strategy
 * Used to get the corresponding room of a request
 * @module strategies/room
 * @requires models/Room
*/

import { IRequest } from '../types/types';
import { Response, NextFunction } from 'express';


import Room, { IRoom } from '../models/Room';


/**
 * 
 * @param {string} req.body.roomId - The id of the room
 * @param {string} req.query.roomId - The id of the room
 */
export default (req: IRequest, res: Response, next: NextFunction) => {
    try {
        // Find the room
        Room.findById(req.body.roomId || req.query.roomId)
            .then((room: IRoom) => {
                req.room = room;
                next();
            })
            .catch((err: Error) => {
                res.status(500).json({
                    message: 'Failed to get corresponding room',
                    error: err
                });
            });
    } catch (error) {
        res.status(401).json({
            message: 'Failed to get corresponding room',
        });
    }
};

