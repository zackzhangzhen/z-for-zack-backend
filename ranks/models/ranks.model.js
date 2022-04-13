const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const rankSchema = new Schema({
    ordinal: Number,
    threshold: Number,
    title: String,
    description: String
});

const Rank = mongoose.model('ranks', rankSchema);

exports.list= () => {
    return new Promise((resolve, reject) => {
        Rank.find({})
            .sort({ordinal:1})
            .exec(function (err, ranks) {
                if (err) {
                    reject(err);
                } else {
                    resolve(ranks);
                }
            })
    });
};

