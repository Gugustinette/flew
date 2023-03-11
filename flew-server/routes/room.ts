/**
 * Room routes
 * Used to manage rooms
 * @module routes/room
 * @requires express
 * @requires strategies/auth
 * @requires strategies/flew
 * @requires controllers/room
*/


import express from 'express';
let router = express.Router();

// Controllers
import roomController from '../controllers/room';

// Strategies
import auth from '../strategies/auth';
import admin from '../strategies/admin';
import flew from '../strategies/flew';
import category from '../strategies/category';
import room from '../strategies/room';


/**
 * PUT /api/room/create
 * @summary Create a new room
 * @tags flew room
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} flewId.request.body - Id of the flew
 * @param {string} name.request.body - Name of the room
 * @param {string} categoryId.request.body - Id of the category
 * @return {SuccessCreated} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.put('/create', auth as any, admin as any, flew as any, category as any, roomController.createRoomInCategory as any);


/**
 * GET /api/room/get
 * @summary Get all rooms of a category
 * @tags flew room
 * @produces application/json
 * @security JWT
 * @param {string} query.userId - Id of the user (USERNAME#0000)
 * @param {string} query.categoryId - Id of the flew
 * @return {array<RoomMinimal>} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.get('/get', auth as any, category as any, roomController.getRooms as any);


/**
 * DELETE /api/room/delete
 * @summary Delete a room
 * @tags flew room
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} roomId.request.body - Id of the room to delete
 * @return {SuccessDelete} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.delete('/delete', auth as any, admin as any, roomController.deleteRoom as any);


/**
 * GET /api/room/getUsersInRoom
 * @summary Get all users in a room
 * @tags flew room
 * @produces application/json
 * @security JWT
 * @param {string} query.userId - Id of the user (USERNAME#0000)
 * @param {string} query.roomId - Id of the flew
 * @return {array<UserProfile>} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
 router.get('/getUsersInRoom', auth as any, room as any, roomController.getUsersInRoom as any);


export default router;

