const express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/login', userController.user_login);

router.post('/createUser', userController.user_create);

router.get('/user/:id', userController.user_detail);

router.get('/user/:id/delete', userController.user_delete);

router.post('/user/:id/update', userController.user_update_post);