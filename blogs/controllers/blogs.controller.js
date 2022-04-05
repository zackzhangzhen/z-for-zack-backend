const BlogModel = require('../models/blogs.model');
const PER_PAGE = require('../../common/config/env.config')['perPage'];

exports.insert = (req, res) => {
    try {
        BlogModel.create(req.body)
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

exports.list = (req, res) => {
    let limit = req.query.limit? parseInt(req.query.limit) : PER_PAGE;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    BlogModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    BlogModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    BlogModel.patchById(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    BlogModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};