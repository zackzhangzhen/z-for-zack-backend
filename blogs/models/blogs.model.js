const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    text: String,
    liked: Boolean,
    date: Date,
});

blogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
blogSchema.set('toJSON', {
    virtuals: true
});

blogSchema.findById = function (cb) {
    return this.model('Blogs').find({id: this.id}, cb);
};

const Blog = mongoose.model('Blogs', blogSchema);

exports.findById = (id) => {
    return Blog.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.create= (blogData) => {
    const blog = new Blog(blogData);
    return blog.save();
};

exports.list= (perPage, page) => {
    return new Promise((resolve, reject) => {
        Blog.find({})
            .sort({date:-1})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, blogs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(blogs);
                }
            })
    });
};

exports.patchById = (id, blogData) => {
    return Blog.findOneAndUpdate({
        _id: id
    }, blogData);
};

exports.removeById = (blogId) => {
    return new Promise((resolve, reject) => {
        Blog.deleteMany({_id: blogId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

