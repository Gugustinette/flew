/**
 * Admin strategy
 * Used to authenticate an admin of a flew
 * @module strategies/admin
 * @requires models/Flew
 * @requires models/User
*/

import { IRequest } from '../types/types';
import { Response, NextFunction } from 'express';


import Flew from '../models/Flew';
import UserProfile from '../models/UserProfile';


export default (req: IRequest, res: Response, next: NextFunction) => {
    try {
        // Find the flew
        Flew.findById(req.body.flewId || req.query.flewId)
            .then(flew => {
                // Find the admin
                UserProfile.findOne({userId: req.user._id})
                    .then(admin => {
                        // Check if the admin is in the admin list of the flew
                        // If so next
                        if (flew.admins.indexOf(admin.userId) !== -1) {
                            next();
                        }
                        // If not, send an error
                        else {
                            res.status(401).json({
                                message: 'You are not an admin of this flew'
                            });
                        }
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: 'Failed to get admin',
                            error: err
                        });
                    });
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Failed to get flew',
                    error: err
                });
            });
        
    } catch (error) {
        res.status(401).json({
            message: 'You are not an admin of this flew'
        });
    }
};
