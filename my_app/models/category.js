const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CatSchema = new Schema(
    {
        name: { type: String, required: true }
    }
);

CatSchema
    .virtual('url')
    .get(function () {
        return '/catalog/category/' + this._id;
    });

CatSchema
    .virtual('img')
    .get(function () {
        return '/images/' + this.name + '.png'
    })

module.exports = mongoose.model('Category', CatSchema);