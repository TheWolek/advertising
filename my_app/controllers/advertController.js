const Advert = require('../models/advert');
const Category = require('../models/category');

const async = require('async');
const { body, validationResult } = require('express-validator');
// const { sanitizeBody } = require('express-validator/filter');

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
            res.render('advert_list', { title: 'Latest adverts', advert_list: list_adverts, log: req.cookies.user_logedIn });
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
        res.render('advert_detail', { title: results.advert.title, advert: results.advert, log: req.cookies.user_logedIn })
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
            res.render("advert_create", { title: "nowe ogłoszenie", categories: results.categories, log: req.cookies.user_logedIn });
        })
    } else {
        res.redirect("/user/login");
    }

}

exports.advert_create_post = [
    // Validate fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),
    body('desc', 'Description must not be empty.').trim().isLength({ min: 1 }),
    body('price', 'price must not be empty').trim().isLength({ min: 1 }),

    // Sanitize fields (using wildcard).
    // body('*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        let today = new Date();
        var advert = new Advert(
            {
                title: req.body.title,
                desc: req.body.desc,
                price: req.body.price,
                owner: req.cookies.user,
                cat: req.body.category,
                expire_date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            console.log('err', errors)
            // Get all authors and genres for form.
            async.parallel({
                categories: function (callback) {
                    Category.find(callback);
                },
            }, function (err, results) {
                if (err) { return next(err); }
                res.render('advert_create', { title: "nowe ogłoszenie", categories: results.categories, advert: advert, errors: errors.array(), log: req.cookies.user_logedIn });
            });
            return;
        }
        else {
            console.log('success', advert)
            // Data from form is valid. Save book.
            advert.save(function (err) {
                if (err) { return next(err); }
                //successful - redirect to new book record.
                res.redirect(advert.url);
            });
        }
    }
];

exports.advert_update_post = function (req, res) {
    res.send('in progress: advert update post')
};

exports.advert_delete_post = function (req, res) {
    res.sedn('in progress: advert delete post')
};