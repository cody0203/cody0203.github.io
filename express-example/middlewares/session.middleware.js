let Session = require("../Models/sessions.model");
// let shortId = require("shortId");
// let db = require("../db")

module.exports = async function (req, res, next) {
    if (!req.signedCookies.sessionId) {
        await Session.create({});
        let sessionId = await Session.distinct("_id");
        res.cookie("sessionId", sessionId[0].toString(), {
            signed: true
        })
    }
    next();
}