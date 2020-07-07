var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

// USER

router.get('/', userController.index);

router.get('/login', userController.user_login_get);

router.post('/login', userController.user_login_post)

router.post('/createUser', userController.user_create);

router.get('/user/:id', userController.user_detail);

router.get('/user/:id/delete', userController.user_delete);

router.post('/user/:id/update', userController.user_update_post);

module.exports = router;
