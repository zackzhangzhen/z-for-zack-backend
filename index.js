const config = require('./common/config/env.config.js');
const cors = require('cors')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const BlogsRouter = require('./blogs/routes.config');
const TopAlertsRouter = require('./top-alerts/routes.config');
const LevelsRouter = require('./levels/routes.config');
const RanksRouter = require('./ranks/routes.config');

app.
// use(cors()).
    use(bodyParser.json()).
    use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, Origin');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
BlogsRouter.routesConfig(app);
TopAlertsRouter.routesConfig(app);
LevelsRouter.routesConfig(app);
RanksRouter.routesConfig(app);

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
