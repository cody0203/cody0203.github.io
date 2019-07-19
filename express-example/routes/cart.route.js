let express = require('express')
let routes = express();
let controller = require("../controller/cart.controller")

routes.get("/add/:productId", controller.addToCart);

module.exports = routes;