/**
 * User model
 * Represents a user of the application
 * @module models/User
 * @requires mongoose
 * @requires mongoose-unique-validator
*/

import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

/**
 * User complete type
 * @typedef {object} User
 * @property {string} _id - The real id of the user
 * @property {string} userId - The profile id of the user
 * @property {string} email - The email address of the user
 * @property {string} username - The username
 * @property {string} avatar - The avatar
 * @property {string} createdAt - The date of creation
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
    username: string;
    userId: string;
    createdAt: Date;
}

// userSchema.plugin(uniqueValidator);
export default mongoose.model('User', userSchema);
export { IUser };
