/**
 * User controller
 * Used to manage users
 * @module controllers/user
 * @requires models/User
 * @requires models/UserProfile
 * @requires bcrypt
 * @requires jsonwebtoken
*/

import { IRequest } from '../types/types';
import { Response } from 'express';

import User, { IUser } from '../models/User';
import UserProfile, { IUserProfile } from '../models/UserProfile';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const keyToken = 'CS969dVVN70s2vWD5pxJUCsRE499308uTacBU179OQ06rgn5oIfZissIK13O7uA7k70Lpr48m3TxgvixGKBCD9OFKEvsQN5kp7J3HTxV7kSk8wuK0446yJGE5MJ4hj90xrQWCi0X2i3XB505wc047A93ekNjhng47meRWyymyuQ1501B2EiR6eovJx5oVEq248p9HI9u';


/**
 * Sign Up - Create a new user
 * @param {*} req.body.email email of the user
 * @param {*} req.body.username username of the user
 * @param {*} req.body.password password of the user
 */
const signup = (req: IRequest, res: Response) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Generate userId of type Username#randomNumber between 0000 and 9999
            let userId = req.body.username + '#' + Math.floor(Math.random() * (9999 - 0) + 0);
            // Get all userId in database and re-generate userId if it already exists
            User.find({ userId: userId })
                .then((users: any) => {
                    // While userId is in database, re-generate userId
                    while (users.length > 0) {
                        userId = req.body.username + '#' + Math.floor(Math.random() * (9999 - 0) + 0);
                        users = User.find({ userId: userId });
                    }
                    // Create user then create user profile
                    const user = new User({
                        email: req.body.email,
                        password: hash,
                        username: req.body.username,
                        userId: userId
                    });
                    user.save()
                        .then(() => {
                            // User profile
                            const userProfile = new UserProfile({
                                username: req.body.username,
                                userId: userId,
                                avatar: req.body.avatar || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                            });
                            userProfile.save()
                                .then(() => res.status(201).json({
                                    userId: user.userId,
                                    token: jwt.sign(
                                        { userId: user.userId },
                                        keyToken,
                                        { expiresIn: '1h' }
                                    )
                                }))
                                .catch(() => res.status(400).json({
                                    error: "Error while creating user profile"
                                }));
                        })
                        .catch(() => res.status(400).json({
                            error: "Error while creating user"
                        }));
                    });
        })
        .catch(() => res.status(500).json({
            error: "Error while hashing password"
        }));
}


/**
 * Login - Log in a user
 * @param {*} req.body.username username of the user
 * @param {*} req.body.password password of the user
 */
const login = (req: IRequest, res: Response) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Wrong password' });
                    }
                    res.status(200).json({
                        userId: user.userId,
                        token: jwt.sign(
                            { userId: user.userId },
                            keyToken,
                            { expiresIn: '1h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}


/**
 * Get user - Return a specific user
 * @param {*} req.user._id : id of the user asking for the profile
 * @param {*} req.query.userIdQuery : id of the user to get
 */
const getUser = (req: IRequest, res: Response) => {
    var userIdQuery = decodeURIComponent(req.query.userIdQuery);
    UserProfile.findOne({ userId : userIdQuery })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(500).json({ error }));
}

export default {
    signup,
    login,
    getUser
}
