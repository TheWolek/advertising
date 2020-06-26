const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdvertSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        desc: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
    }
);

// Virtual for book's URL
AdvertSchema
    .virtual('url')
    .get(function () {
        return '/advert/' + this._id;
    });

//Export model
module.exports = mongoose.model('Advert', AdvertSchema);