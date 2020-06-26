var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        nickname: { type: String, required: true },
        date_of_joining: { type: Date, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    }
);

// Virtual for author's URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/users/' + this._id;
    });

//Export model
module.exports = mongoose.model('User', UserSchema);