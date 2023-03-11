/**
 * Gateway - Delete Room
 * Used to delete a room in a flew
 * @module flew/deleteRoom
*/

module.exports = function deleteRoom(ioServer, flew, room) {
    ioServer.to(flew).emit('room/delete', room);
}
