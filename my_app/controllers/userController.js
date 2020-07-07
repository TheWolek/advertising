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

exports.user_login_post = function (req, res) {
    res.send('in progress: user login POST');
};