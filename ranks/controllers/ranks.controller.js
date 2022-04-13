const RankModel = require('../models/ranks.model');

exports.list = (req, res) => {
    RankModel.list()
    .then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });
};