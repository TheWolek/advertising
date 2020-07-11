const Advert = require('../models/advert');
const Category = require('../models/category');

const async = require('async');

exports.index = function (req, res) {
    async.parallel({
        advert_count: function (callback) {
            Advert.countDocuments({}, callback);
        }
    });
};

exports.advert_latest = function (req, res, next) {
    Advert.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate('adverts')
        .exec(function (err, list_adverts) {
            if (err) return next(err);
            res.render('advert_list', { title: 'Latest adverts', advert_list: list_adverts });
        });
};

exports.advert_details = function (req, res, next) {
    async.parallel({
        advert: function (callback) {
            Advert.findById(req.params.id)
                .populate('owner')
                .populate('cat')
                .exec(callback);
        },
    }, function (err, results) {
        if (err) return next(err);
        if (results.advert == null) {
            var err = new Error('Advert not found');
            err.status = 404;
            return next(err);
        }

        console.log(results)
        res.render('advert_detail', { advert: results.advert })
    })
};

exports.advert_create_get = function (req, res) {
    if (req.cookies.token != undefined) {
        async.parallel({
            categories: function (callback) {
                Category.find(callback);
            }
        }, function (err, results) {
            if (err) return next(err);
            console.log(results.categories)
            res.render("advert_create", { categories: results.categories });
        })
    } else {
        res.redirect("/user/login");
    }

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