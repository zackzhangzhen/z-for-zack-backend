const LevelModel = require('../models/levels.model');

exports.insert = (req, res) => {
    LevelModel.create(req.body)
    .then((result) => {
        res.status(201).send({_id: result._id});
    }).catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });;
};

exports.list = (req, res) => {
    LevelModel.list(req.query.userId)
    .then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });
};