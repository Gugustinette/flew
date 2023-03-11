/**
 * Gateway - Delete Category
 * Used to delete a category in a flew
 * @module flew/deleteCategory
*/

module.exports = function deleteCategory(ioServer, flew, category) {
    ioServer.to(flew).emit('category/delete', category);
}
