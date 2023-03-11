/**
 * Gateway - Create Category
 * Used to create a category in a flew
 * @module flew/createCategory
*/

module.exports = function createCategory(ioServer, flew, category) {
    ioServer.to(flew).emit('category/create', category);
}
