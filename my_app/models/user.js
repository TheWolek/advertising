const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        nickname: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        date_of_join: { type: Date, required: true },
        password: { type: String, required: true }
    }
);

UserSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

module.exports = mongoose.model('User', UserSchema);