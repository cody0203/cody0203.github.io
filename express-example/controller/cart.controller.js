let db = require("../db");

module.exports = {
    addToCart: function(req, res) {
        let productId = req.params.productId;
        let sessionId = req.signedCookies.sessionId;
        if (!sessionId) {
            res.redirect("/products");
            return
        }

        let count = db.get("sessions")
        .find({ id: sessionId })
            .get(`cart.${productId}`, 0)

        db.get("sessions")
        .find({ id: sessionId })
            .set(`cart.${productId}`, count + 1)
        .write();

        res.redirect("/products");
    }
}