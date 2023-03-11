/**
 * Category strategy
 * Used to get the corresponding category of a request
 * @module strategies/category
 * @requires models/Category
*/

import { IRequest } from '../types/types';
import { Response, NextFunction } from 'express';


import Category, { ICategory } from '../models/Category';


/**
 * 
 * @param {string} req.body.categoryId - The id of the category
 * @param {string} req.query.categoryId - The id of the category
 */
export default (req: IRequest, res: Response, next: NextFunction) => {
    try {
        // Find the category
        Category.findById(req.body.categoryId || req.query.categoryId)
            .then((category: ICategory) => {
                req.category = category;
                next();
            })
            .catch((err: Error) => {
                res.status(500).json({
                    message: 'Failed to get corresponding category',
                    error: err
                });
            });
    } catch (error) {
        res.status(401).json({
            message: 'Failed to get corresponding category',
        });
    }
};

