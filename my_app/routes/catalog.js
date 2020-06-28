const express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var catController = require('../controllers/categoryController');
var advertController = require('../controllers/advertController');

// USER

router.get('/login', userController.user_login);

router.post('/createUser', userController.user_create);

router.get('/user/:id', userController.user_detail);

router.get('/user/:id/delete', userController.user_delete);

router.post('/user/:id/update', userController.user_update_post);

//ADVERT

router.get('/', advertController.advert_latest);

router.get('/advert/:id', advertController.advert_details)

router.post('/advert/add')

//CATEGORY

router.get('/categories', catController.categories)

module.exports = router;