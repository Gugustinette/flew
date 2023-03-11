/**
 * User Profile model
 * Represents the profile of a user
 * @module models/UserProfile
 * @requires mongoose
 * @requires mongoose-unique-validator
*/

import mongoose from 'mongoose';
// const uniqueValidator = require('mongoose-unique-validator');

/**
 * User minimal type
 * @typedef {object} UserProfile
 * @property {string} userId - The id of the user
 * @property {string} username - The username
 * @property {string} avatar - The avatar
 */
const userProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    }
});

interface IUserProfile extends mongoose.Document {
    _id: string;
    username: string;
    userId: string;
    avatar: string;
}

interface IUserProfileMinimal {
    username: string;
    userId: string;
    avatar: string;
}

// userProfileSchema.plugin(uniqueValidator);
export default mongoose.model('UserProfile', userProfileSchema);
export { IUserProfile, IUserProfileMinimal };
