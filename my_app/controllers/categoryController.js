const Cat = require('../models/category');

const async = require('async');

exports.categories = function (req, res, next) {
    Cat.find()
        .populate('categories')
        .exec(function (err, list_category) {
            if (err) return next(err);
            res.render('category_list', { title: 'category list', category_list: list_category });
        });
};

exports.advert_create_post = function (req, res) {
    res.send('in progress: advert create post');
};

exports.advert_update_post = function (req, res) {
    res.send('in progress: advert update post')
};

exports.advert_delete_post = function (req, res) {
    res.sedn('in progress: advert delete post')
};