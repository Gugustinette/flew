/**
 * Gateway - Create Room
 * Used to create a room in a flew
 * @module flew/createRoom
*/

module.exports = function createRoom(ioServer, flew, room) {
    ioServer.to(flew).emit('room/create', room);
}
