const BlogsController = require('./controllers/blogs.controller');

exports.routesConfig = function (app) {
    app.post('/blogs', [
        BlogsController.insert
    ]);
    app.get('/blogs', [
        BlogsController.list
    ]);
    app.patch('/blogs/:blogId/like', [
        BlogsController.patchByIdForLike
    ]);
    app.patch('/blogs/:blogId/reply', [
        BlogsController.patchByIdForReply
    ]);
    app.get('/blogs/:blogId', [
        BlogsController.getById
    ]);
    app.delete('/blogs/:blogId', [
        BlogsController.removeById
    ]);
};
