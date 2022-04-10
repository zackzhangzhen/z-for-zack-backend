const TopAlertsController = require('./controllers/top-alerts.controller');

exports.routesConfig = function (app) {
    app.post('/top-alerts', [
        TopAlertsController.insert
    ]);
    app.get('/top-alerts', [
        TopAlertsController.listNew
    ]);
    app.patch('/top-alerts/:topAlertId', [
        TopAlertsController.patchById
    ]);
    app.delete('/top-alerts/:topAlertId', [
        TopAlertsController.removeById
    ]);
};
