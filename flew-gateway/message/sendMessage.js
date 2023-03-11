/**
 * Gateway - Send Message
 * Used to send a message to a room
 * @module message/sendMessage
*/

module.exports = function sendMessage(ioServer, room, message) {
    ioServer.to(room).emit('message/send', message);
}
