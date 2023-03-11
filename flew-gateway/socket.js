/**
 * Socket.io Instance
 * Used to initialize the socket.io server
 * @module socket
 * @requires socket.io
 * @requires message
*/

// Socket.io Instance
const io = require("socket.io");

module.exports.init = function init(server) {
    // Socket.io Initialization
    const ioServer = io(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
    });

    ioServer.on('connection', (socket) => { // When a user connects

        // Flew management
        socket.on('join-flew', (data) => { // When a user joins a flew
            socket.join(data.flew);
        });

        socket.on('leave-flew', (data) => { // When a user joins a flew
            socket.leave(data.flew);
        });

        // Room management
        socket.on('join-room', (data) => { // When a user joins a room
            socket.join(data.room);
        });

        socket.on('leave-room', (data) => { // When a user leaves a room
            socket.leave(data.room);
        });

        socket.on('disconnect', () => { // When a user disconnects
            socket.disconnect();
        });
    });

    return ioServer;
}
