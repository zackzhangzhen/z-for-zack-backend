const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const topAlertSchema = new Schema({
    message: String,
    type: String,
    viewed: Boolean,
    date: Date,
});

topAlertSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
topAlertSchema.set('toJSON', {
    virtuals: true
});

topAlertSchema.findById = function (cb) {
    return this.model('Alerts').find({id: this.id}, cb);
};

const TopAlert = mongoose.model('Alerts', topAlertSchema);

exports.findById = (id) => {
    return TopAlert.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result.__v;
            return result;
        });
};

exports.create= (topAlertData) => {
    const topAlert = new TopAlert(topAlertData);
    return topAlert.save();
};

exports.listNew= () => {
    return new Promise((resolve, reject) => {
        TopAlert.find({viewed: false})
            .sort({date:-1})
            .exec(function (err, topAlerts) {
                if (err) {
                    reject(err);
                } else {
                    resolve(topAlerts);
                }
            })
    });
};

exports.patchById = (id, topAlertData) => {
    return TopAlert.findOneAndUpdate({
        _id: id
    }, topAlertData);
};

exports.removeById = (topAlertId) => {
    return new Promise((resolve, reject) => {
        TopAlert.deleteMany({_id: topAlertId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

