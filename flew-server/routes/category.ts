/**
 * Category routes
 * Used to manage categories
 * @module routes/category
 * @requires express
 * @requires strategies/auth
 * @requires controllers/flew
*/


import express from 'express';
let router = express.Router();

// Controllers
import categoryController from '../controllers/category';

// Strategies
import auth from '../strategies/auth';
import admin from '../strategies/admin';
import flew from '../strategies/flew';


/**
 * PUT /api/category/create
 * @summary Create a new category
 * @tags flew category
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} flewId.request.body - Id of the flew
 * @param {string} name.request.body - Name of the category
 * @return {SuccessCreated} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.put('/create', auth as any, admin as any, flew as any, categoryController.createCategoryInFlew as any);


/**
 * GET /api/category/get
 * @summary Get all categories of a flew
 * @tags flew category
 * @produces application/json
 * @security JWT
 * @param {string} query.userId - Id of the user (USERNAME#0000)
 * @param {string} query.flewId - Id of the flew
 * @return {array<Category>} 200 - Return the created flew
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.get('/get', auth as any, flew as any, categoryController.getCategories as any);


/**
 * DELETE /api/category/delete
 * @summary Delete a category
 * @tags flew category
 * @produces application/json
 * @security JWT
 * @param {string} userId.request.body - Id of the user (USERNAME#0000)
 * @param {string} flewId.request.body - Id of the corresponding flew
 * @param {string} categoryId.request.body - Id of the category to delete
 * @return {SuccessDelete} 200 - Success message
 * @return {string} 401 - Unauthorized
 * @return {string} 500 - Internal Server Error
 */
router.delete('/delete', auth as any, admin as any, flew as any, categoryController.deleteCategory as any);


export default router;

