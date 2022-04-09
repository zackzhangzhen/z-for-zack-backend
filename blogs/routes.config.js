const BlogsController = require('./controllers/blogs.controller');

exports.routesConfig = function (app) {
    app.post('/blogs', [
        BlogsController.insert
    ]);
    app.get('/blogs', [
        BlogsController.list
    ]);
    app.patch('/blogs/:blogId', [
        BlogsController.patchById
    ]);
    app.get('/blogs/:blogId', [
        BlogsController.getById
    ]);
    app.delete('/blogs/:blogId', [
        BlogsController.removeById
    ]);
};
