const Session = require("../Models/sessions.model");

module.exports = {
    addToCart: async function (req, res) {
        let productId = req.params.productId;
        let sessionId = req.signedCookies.sessionId;
        if (!sessionId) {
            res.redirect("/products");
            return
        }

        await Session.findByIdAndUpdate(sessionId, { cart: {[productId]: 0} }, { upsert: true });
        // Session.findById(sessionId, function (err, res) {

        // })
        await Session
            .findByIdAndUpdate(sessionId, { $inc: { [productId]: 0 } }, { upsert: true });

        res.redirect("/products");
    }
}