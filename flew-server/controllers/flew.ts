/**
 * Flew controller
 * Used to manage flews
 * @module controllers/flew
 * @requires models/Flew
 * @requires models/Category
 * @requires models/Room
 * @requires models/Message
*/

import { IRequest } from '../types/types';
import { Response } from 'express';

import Flew, { IFlew, IFlewMinimal } from '../models/Flew';
import Category, { ICategory } from '../models/Category';
import Room, { IRoom } from '../models/Room';
import Message, { IMessage } from '../models/Message';

// Auth
import jwt from 'jsonwebtoken';
const keyToken = 'CS969dVVN70s2vWD5pxJUCsRE499308uTacBU179OQ06rgn5oIfZissIK13O7uA7k70Lpr48m3TxgvixGKBCD9OFKEvsQN5kp7J3HTxV7kSk8wuK0446yJGE5MJ4hj90xrQWCi0X2i3XB505wc047A93ekNjhng47meRWyymyuQ1501B2EiR6eovJx5oVEq248p9HI9u';

/**
 * Create Flew - Create a new flew
 * @param {*} req.user._id id of the user
 * @param {*} req.body.name name of the flew
 * @param {*} req.body.description description of the flew
 */
const createFlew = (req: IRequest, res: Response) => {
    // Create new flew
    const flew = new Flew({
        name: req.body.name,
        description: req.body.description,
        categories: [],
        admins: [
            req.user._id // Add user as admin
        ],
        users: [
            req.user._id
        ]
    });
    flew.save()
        .then((flewDb: IFlew) => { // Save Flew
            // Create first category
            const category = new Category({
                flew: flewDb._id,
                name: "Général",
                rooms: []
            });
            category.save()
                .then((categoryDb: ICategory) => { // Save category
                    flewDb.categories.push(categoryDb._id);
                    flewDb.save()
                        .then(() => { // Add category to flew
                            // Create first room
                            const room = new Room({
                                flew: flewDb._id,
                                category: categoryDb._id,
                                name: "général",
                                users: [ req.user._id ]
                            });
                            room.save()
                                .then((roomDb: IRoom) => { // Save room
                                    categoryDb.rooms.push(roomDb._id);
                                    categoryDb.save()
                                        .then(() => { // Add room to category
                                            // Response
                                            res.status(200).json({
                                                _id: flewDb._id,
                                                name: flewDb.name,
                                                description: flewDb.description
                                            });
                                        })
                                        .catch(() => res.status(500).json({
                                            error: "Failed to initialize first room"
                                        }));
                                })
                                .catch(() => res.status(500).json({
                                    error: "Failed to initialize first room"
                                }));
                        })
                        .catch(() => res.status(500).json({
                            error: "Failed to initialize first category"
                        }));
                })
                .catch(() => res.status(500).json({
                    error: "Failed to initialize first category"
                }));
        })
        .catch(() => res.status(500).json({
            error: "Failed to initialize flew"
        }));
}


/**
 * Get Flews - Get all flews of a user
 * @param {*} req.user._id id of the user
 */
const getFlews = (req: IRequest, res: Response) => {
    // Find all flews of the user
    Flew.find({
        users: req.user._id
    })
        .exec()
        .then(flews => {
            var flewsResponse = [] as IFlewMinimal[];

            flews.forEach(flew => {
                flewsResponse.push({
                    _id: flew._id,
                    name: flew.name,
                    description: flew.description
                });
            });

            res.status(200).json(flewsResponse);
        })
        .catch(error => {
            res.status(400).json({
                error: "Couldn't get flews"
            });
        });
}


/**
 * Delete flew - Delete a flew
 * @param {*} req.user._id id of the user
 * @param {*} req.body.flewId id of the flew
 */
const deleteFlew = (req: IRequest, res: Response) => {
    // Find flew
    Flew.findById(req.body.flewId)
        .then(() => {
            // Delete all categories
            Category.deleteMany({ flew: req.body.flewId })
                .then(() => {
                    // Delete all rooms
                    Room.deleteMany({ flew: req.body.flewId })
                        .then(() => {
                            // Delete all messages
                            Message.deleteMany({ flew: req.body.flewId })
                                .then(() => {
                                    // Delete flew
                                    Flew.deleteOne({ _id: req.body.flewId })
                                        .then(() => {
                                            res.status(200).json({
                                                message: "Flew deleted"
                                            });
                                        })
                                        .catch(() => {
                                            res.status(500).json({
                                                error: "Failed to delete flew"
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
                                error: "Failed to delete corresponding rooms"
                            });
                        });
                })
                .catch(() => {
                    res.status(500).json({
                        error: "Failed to delete corresponding categories"
                    });
                });
        })
        .catch(() => {
            res.status(400).json({
                error: "Couldn't find flew"
            });
        });
}


/**
 * Create flew invite link - Create a link to invite a user to a flew
 * @param {*} req.user._id id of the user
 * @param {*} req.flew id of the flew
 */
const createInviteLink = (req: IRequest, res: Response) => {
    // Create token with flewId
    const token = jwt.sign({
        flewId: req.flew._id
    }, keyToken, { expiresIn: '1h' });
    // Response
    res.status(200).json({
        link: `${process.env.URL_APP}/invite?token=${token}`
    });
}


/**
 * Join flew with invite link - Join a flew with an invite link
 * @param {*} req.user._id id of the user
 * @param {*} req.body.token token of the invite link
 */
const joinWithInviteLink = (req: IRequest, res: Response) => {
    // Verify token
    jwt.verify(req.body.token, keyToken, (err: any, decoded: any) => {
        if (err) {
            res.status(400).json({
                error: "Invalid token"
            });
        } else {
            // Find flew
            Flew.findById(decoded.flewId)
                .then(flew => {
                    // Check if user is already in the flew
                    if (flew.users.includes(req.user._id)) {
                        res.status(400).json({
                            error: "User is already in the flew"
                        });
                    } else {
                        // Add user to flew
                        flew.users.push(req.user._id);
                        flew.save()
                            .then(() => {
                                // Add user to rooms
                                Room.find({ flew: decoded.flewId })
                                    .then(rooms => {
                                        // For each room
                                        Promise.all(rooms.map(room => {
                                            // Push the user
                                            room.users.push(req.user._id);
                                            return room.save();
                                        }))
                                            .then(() => {
                                                // Response
                                                res.status(200).json({
                                                    message: "Flew joined"
                                                });
                                            })
                                            .catch(() => {
                                                res.status(500).json({
                                                    error: "Failed to join flew"
                                                });
                                            });
                                        })
                                        .catch(() => {
                                            res.status(500).json({
                                                error: "Failed to join flew"
                                            });
                                        });
                            })
                            .catch(() => {
                                res.status(500).json({
                                    error: "Failed to join flew"
                                });
                            });
                    }
                })
                .catch(() => {
                    res.status(400).json({
                        error: "Couldn't find flew"
                    });
                });
        }
    });
}

export default {
    createFlew,
    getFlews,
    deleteFlew,
    createInviteLink,
    joinWithInviteLink
}
