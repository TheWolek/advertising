const Cat = require('../models/category');
const Advert = require('../models/advert');

const async = require('async');

exports.categories = function (req, res, next) {
    // Cat.find()
    //     .populate('categories')
    //     .exec(function (err, list_category) {
    //         if (err) return next(err);
    //         res.render('category_list', { title: 'category list', category_list: list_category });
    //     });

    Cat.find()
        .populate('categories')
        .exec(function (err, list_category) {
            if (err) return next(err);
            res.render('category_list', { title: "kategorie", category_list: list_category, log: req.cookies.user_logedIn });
        });
};

exports.category = function (req, res, next) {
    async.parallel({
        category: function (callback) {
            Cat.findById(req.params.id)
                .exec(callback);
        },

        category_adverts: function (callback) {
            Advert.find({ 'cat': req.params.id })
                .exec(callback);
        },

    }, function (err, results) {
        if (err) { return next(err); }
        if (results.category == null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('category', { title: results.category.name, category: results.category, category_adverts: results.category_adverts, log: req.cookies.user_logedIn });
    });
}

exports.advert_create_post = function (req, res) {
    res.send('in progress: advert create post');
};

exports.advert_update_post = function (req, res) {
    res.send('in progress: advert update post')
};

exports.advert_delete_post = function (req, res) {
    res.sedn('in progress: advert delete post')
};