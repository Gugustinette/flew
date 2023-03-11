/**
 * Flew strategy
 * Used to get the corresponding flew of a request
 * @module strategies/flew
 * @requires models/Flew
*/

import { IRequest } from '../types/types';
import { Response, NextFunction } from 'express';


import Flew, { IFlew } from '../models/Flew';


/**
 * 
 * @param {string} req.body.flewId - The id of the flew
 * @param {string} req.query.flewId - The id of the flew
 */
export default (req: IRequest, res: Response, next: NextFunction) => {
    try {
        // Find the flew
        Flew.findById(req.body.flewId || req.query.flewId)
            .then((flew: IFlew) => {
                req.flew = flew;
                next();
            })
            .catch((err: Error) => {
                res.status(500).json({
                    message: 'Failed to get corresponding flew',
                    error: err
                });
            });
    } catch (error) {
        res.status(401).json({
            message: 'Failed to get corresponding flew',
        });
    }
};

