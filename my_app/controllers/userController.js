const User = require('../models/user');

exports.user_detail = function (req, res) {
    res.send('in progress: user detail: ' + req.params.id);
};

exports.user_create = function (req, res) {
    res.send('in progress: create user');
};

exports.user_delete = function (req, res) {
    res.send('in progress: delete user');
};

exports.user_update_post = function (req, res) {
    res.send('in progress: user update post');
};

exports.user_login_get = function (req, res) {
    res.render("user", {});
};

exports.user_login_post = function (req, res, next) {
    let mail = req.body.login
    let pass = req.body.pass

    User.find({ email: mail, password: pass })
        .exec(function (err, foundUser) {
            if (err) return next(err)

            if (foundUser.length == 0) {
                let err = new Error('zły e-mail lub hasło')
                res.render("user", { loginError: err.message })
            } else {
                console.log(foundUser)
                res.render("user_profile", { user: foundUser })
            }
        })

};