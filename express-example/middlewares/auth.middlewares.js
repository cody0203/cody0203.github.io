let User = require("../Models/users.model");

module.exports.authRequired = async function(req, res, next) {
    let cookies = req.signedCookies.userId;
    let user = await User.find({ _id: cookies });

    if (!cookies) {
        res.redirect("/auth/login");
        return;
    }

    if (!user[0]) {
        res.redirect("/auth/login");
        return;
    }
    next();
}