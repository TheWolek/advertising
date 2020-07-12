const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user');


exports.user_detail = function (req, res) {
    res.send('in progress: user detail: ' + req.params.id);
};

exports.user_delete = function (req, res) {
    res.send('in progress: delete user');
};

exports.user_update_post = function (req, res) {
    res.send('in progress: user update post');
};

exports.user_messages = function (req, res) {
    res.render("user_messages", { title: "wiadomości", log: req.cookies.user_logedIn })
}

exports.user_settings = function (req, res) {
    res.render("user_settings", { title: "ustawienia", log: req.cookies.user_logedIn })
}

exports.user_logout_post = function (req, res) {
    if (req.cookies.user_logedIn == "true") {
        res.status(200)
            .clearCookie('token')
            .clearCookie('user')
            .clearCookie('user_logedIn')
            .redirect('/')
    }
}

exports.user_profile = async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        console.log(user)
        res.render('user_profile', { title: "profil", username: user.name, userEmail: user.email, log: req.cookies.user_logedIn });
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
}

exports.user_login_get = function (req, res) {
    console.log(req.cookies.token)
    if (req.cookies.token != undefined) {
        res.redirect("/user/profile")
    } else
        res.render("user", { title: "logowanie", log: req.cookies.user_logedIn });
};

exports.user_login_post = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("user", {
            title: 'logowanie',
            loginError: 'please enter a valid e-mail',
            log: req.cookies.user_logedIn
        });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (!user)
            return res.status(400).render("user", {
                title: 'logowanie',
                loginError: "User Not Exist, don't have account? SignUp!",
                log: req.cookies.user_logedIn
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).render("user", {
                title: 'logowanie',
                loginError: "Incorrect password or e-mail!",
                log: req.cookies.user_logedIn
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                // res.status(200).json({
                //     token
                // });
                // res.status(200)
                res.status(200).cookie('token', token, {
                    maxAge: 1000 * 60 * 2,
                    httpOnly: true
                }).cookie('user', user._id, {
                    maxAge: 1000 * 60 * 2,
                    httpOnly: true
                }).cookie('user_logedIn', true, {
                    maxAge: 1000 * 60 * 2
                }).redirect('/user/profile/');
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.user_signup_post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        username,
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new User({
            nickname: username,
            name: username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).redirect('/user/login')
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
};