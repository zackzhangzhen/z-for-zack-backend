const LevelsController = require('./controllers/levels.controller');

exports.routesConfig = function (app) {
    app.post('/levels', [
        LevelsController.insert
    ]);
    app.get('/levels', [
        LevelsController.list
    ]);
};
