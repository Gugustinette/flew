/**
 * Room controller
 * Used to manage rooms
 * @module controllers/category
 * @requires models/Flew
 * @requires models/Category
 * @requires models/Room
*/

import { IRequest } from '../types/types';
import { Response } from 'express';

// Model
import Flew, { IFlew } from '../models/Flew';
import Category, { ICategory, ICategoryMinimal } from '../models/Category';
import Room, { IRoom, IRoomMinimal } from '../models/Room';
import Message, { IMessage } from '../models/Message';

// Gateway
import Gateway from '../gateway';


/**
 * Create category in flew - Create a category inside a flew
 * @param {*} req.flew : corresponding flew
 * @param {*} req.user._id id of the user
 * @param {*} req.body.name name of the category
 */
const createCategoryInFlew = (req: IRequest, res: Response) => {
    // Create new room
    const category = new Category({
        flew: req.flew._id,
        name: req.body.name
    });
    category.save()
        .then((categoryDb: ICategory) => {
            // Add room to flew
            Flew.findByIdAndUpdate(req.flew._id, {
                $push: {
                    categories: categoryDb._id
                }
            }, {
                new: true
            })
                .then(() => {
                    res.status(201).json({
                        message: 'Category created'
                    });
                    Gateway.send('category/create', {
                        category: categoryDb
                    })
                })
                .catch(() => {
                    res.status(500).json({
                        error: "Failed to add category to flew"
                    });
                });
        })
        .catch(() => res.status(400).json({
            error: "Couldn't create category"
        }));
}


/**
 * Get Category - Get all categories of a flew
 * @param {*} req.user._id id of the user
 * @param {*} req.flew corresponding flew
 */
const getCategories = (req: IRequest, res: Response) => {
    // Find all categories of a flew
    Category.find({flew: req.flew._id})
        // Omit messages and users from rooms
        .populate('rooms', {messages: 0, users: 0})
        .then((categories: ICategory[]) => {
            var categoriesResponse = [] as ICategoryMinimal[];

            categories.forEach((category: ICategory) => {
                // For each rooms in category, change the format
                var roomsResponse = [] as IRoomMinimal[];

                category.rooms.forEach((room: IRoom) => {
                    roomsResponse.push({
                        _id: room._id,
                        name: room.name,
                        category: category._id
                    });
                });

                categoriesResponse.push({
                    _id: category._id,
                    name: category.name,
                    rooms: roomsResponse
                });
            });

            res.status(200).json(categoriesResponse);
        })
        .catch(() => {
            res.status(400).json({
                error: "Couldn't get categories"
            });
        });
}


/**
 * Delete Category - Delete a specific category, all its rooms and all its messages
 * @param {*} req.user._id id of the user
 * @param {*} req.flew corresponding flew
 * @param {*} req.body.categoryId id of the category
 */
const deleteCategory = (req: IRequest, res: Response) => {
    // Find category
    Category.findById(req.body.categoryId)
        .then(categoryDb => {
            // Find all rooms of the category
            Room.find({category: categoryDb._id})
                .then(rooms => {
                    // Delete all messages of all rooms
                    Promise.all(rooms.map(room => {
                        return Message.deleteMany({
                            flew: req.flew._id,
                            room: room._id
                        });
                    }))
                    .then(() => {
                        // Delete all rooms
                        Promise.all(rooms.map(room => {
                            return Room.deleteOne({
                                flew: req.flew._id,
                                _id: room._id
                            });
                        }))
                        .then(() => {
                            // Update flew
                            Flew.findByIdAndUpdate(req.flew._id, {
                                $pull: {
                                    categories: categoryDb._id
                                }
                            }, {
                                new: true
                            })
                            .then(() => {
                                // Delete category
                                Category.deleteOne({_id: categoryDb._id})
                                    .then(() => {
                                        res.status(200).json({
                                            message: 'Category deleted'
                                        });
                                        Gateway.send('category/delete', {
                                            category: categoryDb
                                        });
                                    })
                                    .catch(() => {
                                        res.status(500).json({
                                            error: "Failed to delete category"
                                        });
                                    });
                                })
                            .catch(() => {
                                res.status(500).json({
                                    error: "Failed to delete category"
                                });
                            });
                        })
                        .catch(() => {
                            res.status(500).json({
                                error: "Failed to delete corresponding rooms"
                            });
                        });
                    })
                    .catch(() => {
                        res.status(500).json({
                            error: "Failed to delete corresponding messages"
                        });
                    });
                })
                .catch(() => {
                    res.status(500).json({
                        error: "Failed to get corresponding rooms",
                    });
                });
        })
        .catch(() => {
            res.status(400).json({
                error: "Couldn't get category"
            });
        });
}

export default {
    createCategoryInFlew,
    getCategories,
    deleteCategory
}
