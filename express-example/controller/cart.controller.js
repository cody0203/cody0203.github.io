const Session = require("../Models/sessions.model");

module.exports = {
    addToCart: async function (req, res) {
        let productId = req.params.productId;
        let sessionId = req.signedCookies.sessionId;
        if (!sessionId) {
            res.redirect("/products");
            return
        }

        let count = await Session.findByIdAndUpdate(sessionId, { $push: {"cart": { productId: 0 } } }, { safe: true, upsert: true, new: true});

        // Session
        //     .findByIdAndUpdate(sessionId, { $inc: { [productId]: 1 } });

        res.redirect("/products");
    }
}