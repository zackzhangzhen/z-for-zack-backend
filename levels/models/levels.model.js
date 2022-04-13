const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const levelSchema = new Schema({
    lastRank: {
        type: Schema.Types.ObjectId,
        ref: "ranks"
    },
    currentRank: {
        type: Schema.Types.ObjectId,
        ref: "ranks"
    },
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    userId: String
});

const Level = mongoose.model('levels', levelSchema);

exports.create = (levelData) => {
    const level  = new Level(levelData);
    return level.save();
};

exports.findById = (id) => {
    return Level.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result.__v;
            return result;
        });
};

exports.list= (userId) => {
    return new Promise((resolve, reject) => {
        Level.find({userId: userId})
            .populate("user")
            // .populate("lastRank")
            .populate("currentRank")
            .sort({date:1})
            .exec(function (err, levels) {
                if (err) {
                    reject(err);
                } else {
                    resolve(levels);
                }
            })
    });
};

