/**
 * Gateway - Delete Message
 * Used to communicate the deletion of a message to every user in the room
 * @module message/deleteMessage
*/

module.exports = function deleteMessage(ioServer, room, message) {
    ioServer.to(room).emit('message/delete', message);
}
