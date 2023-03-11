/**
 * Room controller
 * Used to manage rooms
 * @module controllers/room
 * @requires models/Category
 * @requires models/Room
 * @requires models/Message
*/

import { IRequest } from '../types/types';
import { Response } from 'express';

// Models
import Category, { ICategory } from '../models/Category';
import Room, { IRoom, IRoomMinimal } from '../models/Room';
import Message, { IMessage } from '../models/Message';
import UserProfile, { IUserProfile } from '../models/UserProfile';

// Gateway
import Gateway from '../gateway';


/**
 * Create Room in Category - Create a new room in a category
 * @param {*} req.user._id id of the user
 * @param {*} req.flew corresponding flew
 * @param {*} req.category corresponding category
 * @param {*} req.body.name name of the room
 */
const createRoomInCategory = (req: IRequest, res: Response) => {
    // Create new room
    const room = new Room({
        flew: req.flew._id,
        category: req.category._id,
        name: req.body.name,
        users: req.flew.users
    });
    room.save()
        .then((roomDb: IRoom) => {
            // Find category
            Category.findById(req.body.categoryId)
                .then(categoryDb => {
                    // Add room to category
                    categoryDb.rooms.push(roomDb._id);
                    categoryDb.save()
                        .then(() => { // Add room to category
                            // Response
                            res.status(200).json({
                                message: "Room Created"
                            });
                            Gateway.send('room/create', {
                                room: roomDb,
                                user: req.user
                            })
                        })
                        .catch(() => res.status(500).json({
                            error: "Failed to add room to category",
                        }));
                })
                .catch(() => res.status(500).json({
                    error: "Failed to find category",
                }));
        })
        .catch(() => res.status(400).json({
            error: "Couldn't create room",
        }));
}


/**
 * Get Rooms - Get all rooms of a category
 * @param {*} req.user._id id of the user
 * @param {*} req.category corresponding category
 */
const getRooms = (req: IRequest, res: Response) => {
    // Find all rooms of a category
    // Omit users and messages
    Room.find({category: req.category._id}, {messages: 0, users: 0})
        .then((rooms: IRoom[]) => {
            var roomsResponse = [] as IRoomMinimal[];
            
            rooms.forEach((room: IRoom) => {
                roomsResponse.push({
                    _id: room._id,
                    name: room.name,
                    category: room.category,
                });
            });

            res.status(200).json(roomsResponse);
        })
        .catch(err => {
            res.status(400).json({
                error: "Couldn't get rooms"
            });
        });
}


/**
 * Delete Room - Delete a specific room, all its messages and remove the room from the category
 * @param {*} req.user._id id of the user
 * @param {*} req.body.roomId id of the room
 */
const deleteRoom = (req: IRequest, res: Response) => {
    // Find the room
    Room.findById(req.body.roomId)
        .then((room: IRoom) => {
            // Find the category
            Category.findById(room.category)
                .then((category: ICategory) => {
                    // Remove the room from the category
                    category.rooms.splice(category.rooms.indexOf(room._id), 1);
                    category.save()
                        .then(() => {
                            // Remove the messages of the room
                            Message.deleteMany({room: room._id})
                                .then(() => {
                                    // Remove the room
                                    Room.deleteOne({_id: room._id})
                                        .then(() => {
                                            res.status(200).json({
                                                message: 'Room deleted'
                                            });
                                            Gateway.send('room/delete', {
                                                room: room,
                                                user: req.user
                                            })
                                        })
                                        .catch(() => {
                                            res.status(500).json({
                                                message: 'Failed to delete room',
                                            });
                                        });
                                })
                            .catch(() => {
                                res.status(500).json({
                                    message: 'Failed to delete corresponding messages',
                                });
                            });
                        })
                        .catch(() => {
                            res.status(500).json({
                                message: 'Failed to delete corresponding category',
                            });
                        });
                })
                .catch(() => {
                    res.status(500).json({
                        message: 'Failed to delete room',
                    });
                });
        })
        .catch(() => {
            res.status(500).json({
                message: 'Failed to delete room',
            });
        });
}


/**
 * Get Users in Room - Get all users in a room
 * @param {*} req.user._id id of the user
 * @param {*} req.room corresponding room
 */
const getUsersInRoom = (req: IRequest, res: Response) => {
    // For each user in the room, get the UserProfile
    UserProfile.find({userId: {$in: req.room.users}})
        .then((users: IUserProfile[]) => 
            res.status(200).json(users)
        )
        .catch(() => {
            res.status(500).json({
                message: 'Failed to get users in room',
            });
        });
}

export default {
    createRoomInCategory,
    getRooms,
    deleteRoom,
    getUsersInRoom
}
