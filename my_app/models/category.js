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

module.exports = mongoose.model('Category', CatSchema);