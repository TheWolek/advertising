const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdvertSchema = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        cat: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        expire_date: { type: Date, required: true }
    }
);

AdvertSchema
    .virtual('url')
    .get(function () {
        return '/catalog/advert/' + this._id;
    });

module.exports = mongoose.model('Advert', AdvertSchema);