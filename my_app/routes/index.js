var express = require('express');
var router = express.Router();

const Advert = require('../models/advert');
const Cat = require('../models/category');

/* GET home page. */
router.get('/', function (req, res, next) {
  Advert.find()
    .sort({ _id: -1 })
    .limit(10)
    .populate('adverts')
    .exec(function (err, list_adverts) {
      if (err) return next(err);
      Cat.find()
        .populate('categories')
        .exec(function (err, list_category) {
          if (err) return next(err);
          res.render('index', { category_list: list_category, advert_list: list_adverts });
        });
    });
});

module.exports = router;
