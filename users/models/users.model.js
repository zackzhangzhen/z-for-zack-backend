const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password : String,
    likes: Number,
    level: Number,
    credits: Number,
    vip: Boolean,
    admin: Boolean
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('users').find({id: this.id}, cb);
};

const User = mongoose.model('users', userSchema);

exports.findByEmail = (email) => {
    return User.find({email: email});
};

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            if (!result) {
                return {};
            }
            result = result.toJSON();
            delete result.__v;
            return result;
        });
};

exports.find = (name) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (name) {
            filter.name = name;
        }
        User.find(filter).exec(function (err, users) {
            if (err) {
                reject(err);
            } else {
                resolve(users);
            }
        })
    });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

