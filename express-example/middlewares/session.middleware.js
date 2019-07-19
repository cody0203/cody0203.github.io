let shortId = require("shortid");
let db = require("../db")

module.exports = function (req, res, next) {
    if (!req.signedCookies.sessionId) {
        let sessionId = shortId.generate();
        res.cookie("sessionId", sessionId, {
            signed: true
        })
        db.get("sessions").push({
            id: sessionId
        }).write();
    }
    console.log(req.signedCookies.sessionId)
    next();
}