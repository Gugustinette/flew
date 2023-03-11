/**
 * Flew routes
 * Used to manage flews
 * @module routes/flew
 * @requires express
 * @requires strategies/auth
 * @requires controllers/flew
*/


import express from 'express';
let router = express.Router();

// Controllers
import flewController from '../controllers/flew';

// Strategies
import auth from '../strategies/auth';
import admin from '../strategies/admin';
import flew from '../strategies/flew';


/**
 * GET /api/flew/get
 * @summary Get all flews
 * @tags flew
 * @produces application/json
 * @security JWT
 * @param {string} userId.query - Id of the user (USERNAME#0000)
 * @return {array<FlewMinimal>} 200 - Return all the flews of the user
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.get('/get', auth as any, flewController.getFlews as any);


/**
 * PUT /api/flew/create
 * @summary Create a new flew
 * @tags flew
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} name.request.body - Name of the flew
 * @param {string} description.request.body - Description of the flew
 * @return {FlewMinimal} 200 - Return the created flew
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.put('/create', auth as any, flewController.createFlew as any);


/**
 * DELETE /api/flew/delete
 * @summary Delete a flew
 * @tags flew
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} flewId.request.body - Id of the flew
 * @return {SuccessDelete} 200 - Return success
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.delete('/delete', auth as any, admin as any, flewController.deleteFlew as any);


/**
 * PUT /api/flew/createInviteLInk
 * @summary Create a new invite link
 * @tags flew
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} flewId.request.body - Id of the flew
 * @return {SuccessDelete} 200 - Return success
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.put('/createInviteLink', auth as any, admin as any, flew as any, flewController.createInviteLink as any);


/**
 * POST /api/flew/invite
 * @summary Join a flew with an invite link
 * @tags flew
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} token.request.body - Token of the invite link
 * @return {SuccessDelete} 200 - Return success
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.post('/invite', auth as any, flewController.joinWithInviteLink as any);


export default router;

