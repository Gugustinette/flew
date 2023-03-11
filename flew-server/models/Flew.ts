/**
 * Flew model
 * Represents a flew server
 * @module models/Flew
 * @requires mongoose
*/

import mongoose from 'mongoose';

/**
 * Flew minimal type
 * @typedef {object} FlewMinimal
 * @property {string} _id - The id of the flew
 * @property {string} name - The title
 * @property {string} description - The description
 */
/**
 * Flew complete type
 * @typedef {object} Flew
 * @property {string} _id - The id of the flew
 * @property {string} name - The title
 * @property {string} description - The description
 * @property {array<Category>} categories - The categories
 * @property {array<UserProfile>} admins - The admins
 * @property {array<UserProfile>} users - The users
 * @property {Date} createdAt - The date of creation
 */
const flewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    admins: [{
        type: String
    }],
    users: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

interface IFlew extends mongoose.Document {
    _id: string;
    name: string;
    description: string;
    categories: string[];
    admins: string[];
    users: string[];
    createdAt: Date;
}

interface IFlewMinimal {
    _id: string;
    name: string;
    description: string;
}

export default mongoose.model('Flew', flewSchema);
export { IFlew, IFlewMinimal };
