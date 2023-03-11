/**
 * Category model
 * Represents a Category of rooms in a flew server
 * @module models/Category
 * @requires mongoose
*/

import mongoose from 'mongoose';
import { IRoom, IRoomMinimal } from './Room';

/**
 * Category complete type
 * @typedef {object} Category
 * @property {string} _id - The id of the category
 * @property {string} name - The title
 * @property {array<RoomMinimal>} rooms - The rooms in the category
 */
const categorySchema = new mongoose.Schema({
    flew: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flew'
    },
    name: {
        type: String,
        required: true
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

interface ICategory extends mongoose.Document {
    _id: string;
    name: string;
    rooms: string[] & IRoom[];
    createdAt: Date;
}

interface ICategoryMinimal {
    _id: string;
    name: string;
    rooms: IRoomMinimal[];
}

export default mongoose.model('Category', categorySchema);
export { ICategory, ICategoryMinimal };
