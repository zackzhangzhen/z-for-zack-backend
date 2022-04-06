const TopAlertModel = require('../models/top-alerts.model');

exports.insert = (req, res) => {
    try {
        TopAlertModel.create(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        }).catch(error => {
            console.log(error);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err});
    }
};

exports.listNew = (req, res) => {
    TopAlertModel.listNew()
        .then((result) => {
            res.status(200).send(result);
        }).catch(error => {
        console.log(error);
    });
};

exports.patchById = (req, res) => {
    TopAlertModel.patchById(req.params.topAlertId, req.body)
        .then((result) => {
            res.status(204).send({});
        }).catch(error => {
        console.log(error);
    });

};

exports.removeById = (req, res) => {
    TopAlertModel.removeById(req.params.topAlertId)
        .then((result)=>{
            res.status(204).send({});
        }).catch(error => {
        console.log(error);
    });;
};