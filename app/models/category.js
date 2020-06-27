var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CatSchema = new Schema(
    {
        name: { type: String, required: true }
    }
);

// Virtual for book's URL
CatSchema
    .virtual('url')
    .get(function () {
        return '/category/' + this._id;
    });

//Export model
module.exports = mongoose.model('Category', CatSchema);