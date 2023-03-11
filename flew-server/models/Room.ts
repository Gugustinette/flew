/**
 * Room model
 * Represents a room in a flew server
 * @module models/Room
 * @requires mongoose
*/

import mongoose from 'mongoose';
import { IMessage } from './Message';

/**
 * Room minimal type
 * @typedef {object} RoomMinimal
 * @property {string} _id - The id of the room
 * @property {string} name - The title
 */
/**
 * Room complete type
 * @typedef {object} Room
 * @property {string} _id - The id of the room
 * @property {string} flew - The id of the flew in which the room is
 * @property {string} category - The id of the category in which the room is
 * @property {string} name - The title
 * @property {array<Message>} messages - The messages in the room
 * @property {array<UserProfile>} users - The users in the room
 * @property {string} createdAt - The date of creation
 */
const roomSchema = new mongoose.Schema({
    flew: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flew',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String,
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    users: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

interface IRoom extends mongoose.Document {
    _id: string;
    flew: string;
    category: string;
    name: string;
    messages: IMessage[];
    users: string[];
    createdAt: Date;
}

interface IRoomMinimal {
    _id: string;
    name: string;
    category: string;
}

export default mongoose.model('Room', roomSchema);
export { IRoom, IRoomMinimal };
