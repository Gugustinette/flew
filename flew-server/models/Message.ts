/**
 * Message model
 * Represents a message in a room
 * @module models/Message
 * @requires mongoose
*/

import mongoose from 'mongoose';
import { IUserProfile, IUserProfileMinimal } from './UserProfile';

/**
 * Message minimal type
 * @typedef {object} MessageMinimal
 * @property {string} _id - The id of the mesage
 * @property {string} content - The content of the message
 * @property {UserProfile} user - The user who sent the message
 * @property {string} createdAt - The date of creation
 */
/**
 * Message complete type
 * @typedef {object} Message
 * @property {string} _id - The id of the mesage
 * @property {string} flew - The id of the flew in which the message is
 * @property {string} room - The id of the room in which the message is
 * @property {string} content - The content of the message
 * @property {UserProfile} user - The user who sent the message
 * @property {string} createdAt - The date of creation
 */
const messageSchema = new mongoose.Schema({
    flew: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flew',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

interface IMessage extends mongoose.Document {
    _id: string;
    flew: string;
    room: string;
    content: string;
    user: string & IUserProfile;
    createdAt: Date;
}

interface IMessageMinimal {
    _id: string;
    content: string;
    user: string & IUserProfileMinimal;
    createdAt: Date;
}

export default mongoose.model('Message', messageSchema);
export { IMessage, IMessageMinimal };
