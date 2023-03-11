/**
 * Gateway - Rest API Manager
 * Used to link the socket.io server with the Flew Rest API
 */

var express = require('express');
var router = express.Router();

// Controllers
const sendMessage = require('../message/sendMessage');
const createRoom = require('../flew/createRoom');
const deleteRoom = require('../flew/deleteRoom');
const createCategory = require('../flew/createCategory');
const deleteCategory = require('../flew/deleteCategory');

module.exports = (ioServer) => {
    /**
     * POST /api/socket/message/send
     * @summary A user sends a message to a room
     * @tags message
     * @param {string} user.request.body - The user who sends the message
     * @param {string} content.request.body - The content of the message
     * @param {string} room.request.body - The room where the message is sent
     */
    router.post('/message/send', (req, res) => {
        sendMessage(ioServer, req.body.room._id, {
            user: req.body.user,
            content: req.body.content
        });
        res.sendStatus(200);
    });

    /**
     * POST /api/socket/room/create
     * @summary A user creates a room
     * @tags room
     * @param {string} room.request.body - The room which is created
     */
    router.post('/room/create', (req, res) => {
        createRoom(ioServer, req.body.room.flew, req.body.room);
        res.sendStatus(200);
    });

    /**
     * POST /api/socket/room/delete
     * @summary A user deletes a room
     * @tags room
     * @param {string} room.request.body - The room which is deleted
     */
    router.post('/room/delete', (req, res) => {
        deleteRoom(ioServer, req.body.room.flew, req.body.room);
        res.sendStatus(200);
    });

    /**
     * POST /api/socket/category/create
     * @summary A user creates a category
     * @tags category
     * @param {string} category.request.body - The category which is created
     */
     router.post('/category/create', (req, res) => {
        createCategory(ioServer, req.body.category.flew, req.body.category);
        res.sendStatus(200);
    });

    /**
     * POST /api/socket/category/delete
     * @summary A user deletes a category
     * @tags category
     * @param {string} category.request.body - The category which is deleted
     */
     router.post('/category/delete', (req, res) => {
        deleteCategory(ioServer, req.body.category.flew, req.body.category);
        res.sendStatus(200);
    });

    return router;
}
