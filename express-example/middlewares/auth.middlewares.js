let db = require("../db");

module.exports.authRequired = function(req, res, next) {
    let cookies = req.signedCookies.userId;
    let user = db.get("users").find({ id: cookies }).value();

    if (!cookies) {
        res.redirect("/auth/login");
        return;
    }

    if (!user) {
        res.redirect("/auth/login");
        return;
    }
    next();
}