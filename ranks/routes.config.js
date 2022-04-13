const RanksController = require('./controllers/ranks.controller');

exports.routesConfig = function (app) {
    app.get('/ranks', [
        RanksController.list
    ]);
};
