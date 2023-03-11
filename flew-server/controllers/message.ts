/**
 * Message controller
 * Used to manage messages
 * @module controllers/message
 * @requires models/Room
 * @requires models/Message
*/

import { IRequest } from '../types/types';
import { Response } from 'express';

// Models
import Room from '../models/Room';
import Message, { IMessage, IMessageMinimal } from '../models/Message';
import UserProfile, { IUserProfile } from '../models/UserProfile';

// Gateway
import Gateway from '../gateway';


/**
 * Send Message
 * @param {*} req.user._id id of the user
 * @param {*} req.body.content content of the message
 * @param {*} req.flew corresponding flew
 * @param {*} req.room corresponding room
 */
const sendMessage = (req: IRequest, res: Response) => {
    // Find the UserProfile corresponding to req.user._id
    UserProfile.findOne({userId: req.user._id})
        .then((user: IUserProfile) => {
            // Create new message
            const message = new Message({
                flew: req.flew._id,
                room: req.room._id,
                content: req.body.content,
                user: user._id
            });
            message.save()
                .then((result: IMessage) => {
                    // Add message to room
                    Room.findByIdAndUpdate(req.room._id, {
                        $push: {
                            messages: result._id
                        }
                    }, {
                        new: true
                    })
                        .then(() => {
                            res.status(201).json({
                                message: "Message sent"
                            });
                            // Link to Gateway
                            Gateway.send('message/send', {
                                user: user,
                                content: req.body.content,
                                room: req.room
                            });
                        })
                        .catch(() => {
                            res.status(500).json({
                                error: "Error while adding message to room"
                            });
                        });
                })
                .catch(() => {
                    res.status(400).json({
                        error: "Couldn't send message"
                    });
                });
        })
        .catch(() => {
            res.status(500).json({
                error: "Error while finding user"
            });
        }
    );
}


/**
 * Get Messages - Get last 10 messages of a room
 * @param {*} req.user._id id of the user
 * @param {*} req.room corresponding room
 */
const getMessages = (req: IRequest, res: Response) => {
    // Get last 10 messages
    Message.find({
        room: req.room._id
    })
        .sort({
            createdAt: -1
        })
        .limit(40)
        .populate('user')
        .then((messages: IMessage[]) => {
            // Reverse messages
            messages.reverse();

            var messagesResponse = [] as IMessageMinimal[];

            messages.forEach((message: IMessage) => {
                messagesResponse.push({
                    _id: message._id,
                    content: message.content,
                    user: message.user,
                    createdAt: message.createdAt
                });
            });

            res.status(200).json(messagesResponse);
        })
        .catch(() => {
            res.status(400).json({
                error: "Couldn't get messages"
            });
        });
}


/**
 * Delete Message - Delete a specific message
 * @param {string} req.user._id id of the user
 * @param {string} req.body.messageId id of the message
 */
const deleteMessage = (req: IRequest, res: Response) => {
    // Find message
    Message.findById(req.body.messageId)
        .populate('user')
        .then(message => {
            // Check if message belongs to user
            if (message.user.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({
                    message: "Message doesn't belong to user"
                });
            }
            // Delete message
            message.remove()
                .then(() => {
                    res.status(200).json({
                        message: "Message deleted"
                    });
                })
                .catch(() => {
                    res.status(500).json({
                        error: "Error while deleting message"
                    });
                });
        })
        .catch(() => {
            res.status(400).json({
                error: "Couldn't get message"
            });
        });
}

export default {
    sendMessage,
    getMessages,
    deleteMessage
}
