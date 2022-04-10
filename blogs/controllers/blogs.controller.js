const BlogModel = require('../models/blogs.model');
const UserModel = require('../../users/models/users.model');
const PER_PAGE = require('../../common/config/env.config')['perPage'];
const BLOG_IMAGE_FOLDER = require('../../common/config/env.config')['blogImageFolder'];
const Utils = require('../../utils/utils')
const formidable = require('formidable');
const fs = require('fs');
const uuid = require('uuid');
exports.insert = (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        let newPath= "";
        let newFileName= "";
        form.parse(req, function (err, fields, form) {
            if (form.image) {
                let oldPath = form.image.filepath;
                newFileName = uuid.v4()+ "_" + form.image.originalFilename;
                newPath = BLOG_IMAGE_FOLDER + newFileName;
                fs.rename(oldPath, newPath, function (err) {
                    if (err) throw err;
                });
            }

            let blog = {
                title: fields.title,
                text: fields.text,
                image: newFileName,
                likes: 0,
                likedBy: [],
                date: new Date()
            };

            BlogModel.create(blog)
            .then((result) => {
                res.status(201).send({id: result._id});
            }).catch(error => {
                throw error;
            });
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
    // get the blog and user's like related info from backend in realtime instead of using the one
    // passed in from front-end, the value from front-end could be out-dated
    // by a large margin (especially when the user has stayed on the page being
    // idle for a long time before clicking like), also return blog and user model for front-end update.
    BlogModel.findById(req.params.blogId).then(
        blog => {
            if (req.query.userId && req.query.userLikesIncrement
                && req.query.userCreditsIncrement) {

                let increments = Utils.updateBlogForUserLike(req, blog);

                BlogModel.patchById(req.params.blogId, blog)
                .then((result) => {

                    UserModel.findById(req.query.userId).then(
                        user => {
                            Utils.updateUserForUserLike(user,
                                increments['likesIncrement'],
                                increments['creditsIncrement']);
                            UserModel.patchUser(req.query.userId,
                                {
                                    likes: user.likes,
                                    credits: user.credits
                                }).then(
                                res.status(200).send({
                                    blog: blog,
                                    user: user
                                }))
                        }
                    )
                }).catch(error => res.status(500).send(error));
            } else {
                res.status(204).send({});
            }
        }
    ).catch(error => res.status(500).send(error));
};

exports.removeById = (req, res) => {
    BlogModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};