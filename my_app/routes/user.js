var express = require('express');
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var router = express.Router();

const User = require("../models/user");
const userController = require('../controllers/userController');
const auth = require("../controllers/auth");

// USER

router.get('/', userController.user_login_get);

router.get('/login', userController.user_login_get);

router.post('/login',
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    userController.user_login_post
)

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    userController.user_signup_post
);

router.get("/profile", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        console.log(user)
        res.render('user_profile', user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

router.get('/user/:id', userController.user_detail);

router.get('/user/:id/delete', userController.user_delete);

router.post('/user/:id/update', userController.user_update_post);

module.exports = router;
