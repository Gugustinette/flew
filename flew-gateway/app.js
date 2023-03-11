/**
 * app.js
 * Define the Gateway server side application
*/

// App Dependencies
const express = require('express');
const cors = require('cors');

// App Initialization
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
    }
));

// Socket Dependencies
const socket = require('./socket');

// Create Server
const server = require('http').createServer(app);

// Configure Socket
var ioServer = socket.init(server);

// Link Rest API with Socket.io
app.use('/api/socket', require('./api')(ioServer));

module.exports = server;
