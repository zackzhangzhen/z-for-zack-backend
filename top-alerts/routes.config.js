const TopAlertsController = require('./controllers/top-alerts.controller');

exports.routesConfig = function (app) {
    app.post('/topAlerts', [
        TopAlertsController.insert
    ]);
    app.get('/topAlerts', [
        TopAlertsController.listNew
    ]);
    app.patch('/topAlerts/:topAlertId', [
        TopAlertsController.patchById
    ]);
    app.delete('/topAlerts/:topAlertId', [
        TopAlertsController.removeById
    ]);
};
