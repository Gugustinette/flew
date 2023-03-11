/**
 * User routes
 * Used to manage users
 * @module routes/user
 * @requires express
 * @requires strategies/auth
 * @requires controllers/user
*/


import express from 'express';
let router = express.Router();

// Controllers
import userController from '../controllers/user';

// Strategies
import auth from '../strategies/auth';


/**
 * POST /api/user/signup
 * @summary Signup a user
 * @tags user
 * @produces application/json
 * @security JWT
 * @param {string} username.request.body - Username of the user
 * @param {string} password.request.body - Password of the user
 * @param {string} email.request.body - Email of the user
 * @return {SuccessSignup} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.post('/signup', userController.signup as any);


/**
 * POST /api/user/login
 * @summary Login a user
 * @tags user
 * @produces application/json
 * @security JWT
 * @param {string} username.request.body - Username of the user
 * @param {string} password.request.body - Password of the user
 * @return {SuccessLogin} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.post('/login', userController.login as any);


/**
 * GET /api/user/getuser
 * @summary Get a user
 * @tags user
 * @produces application/json
 * @security JWT
 * @param {string} query.userId - Id of the user (USERNAME#0000)
 * @param {string} query.userIdQuery - Id of the user to get (USERNAME#0000)
 * @return {UserProfile} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.get('/getuser', auth as any, userController.getUser as any);


export default router;

