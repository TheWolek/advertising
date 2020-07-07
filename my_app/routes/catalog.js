const express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var catController = require('../controllers/categoryController');
var advertController = require('../controllers/advertController');

//ADVERT

router.get('/', advertController.advert_latest);

router.get('/advert/:id', advertController.advert_details)

router.post('/advert/add')

//CATEGORY

router.get('/categories', catController.categories)

router.get('/category/:id', catController.category)

module.exports = router;