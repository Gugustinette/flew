/**
 * Message routes
 * Used to manage messages
 * @module routes/message
 * @requires express
 * @requires strategies/auth
 * @requires controllers/message
*/


import express from 'express';
let router = express.Router();

// Controllers
import messageController from '../controllers/message';

// Strategies
import auth from '../strategies/auth';
import flew from '../strategies/flew';
import room from '../strategies/room';


/**
 * PUT /api/message/send
 * @summary Send a message
 * @tags message
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} flewId.request.body - Id of the flew
 * @param {string} roomId.request.body - Id of the room
 * @param {string} content.request.body - Content of the message
 * @return {SuccessCreated} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.put('/send', auth as any, flew as any, room as any, messageController.sendMessage as any);


/**
 * GET /api/message/get
 * @summary Get all messages of a room
 * @tags message
 * @produces application/json
 * @security JWT
 * @param {string} query.userId - Id of the user (USERNAME#0000)
 * @param {string} query.roomId - Id of the room
 * @return {array<MessageMinimal>} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.get('/get', auth as any, room as any, messageController.getMessages as any);


/**
 * DELETE /api/message/delete
 * @summary Delete a message
 * @tags message
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} messageId.request.body - Id of the message to delete
 * @return {SuccessCreated} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.delete('/delete', auth as any, messageController.deleteMessage as any);


export default router;

