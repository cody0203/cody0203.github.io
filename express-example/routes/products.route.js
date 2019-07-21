let express = require('express')
let routes = express();
let controller = require("../controller/products.controller")

let authMiddlewares = require("../middlewares/auth.middlewares")

routes.get("/", controller.get);
routes.get('/create', authMiddlewares.authRequired, controller.getCreateProducts)
// routes.get('/:id', controller.view)

routes.post('/create', controller.postCreateProducts)

module.exports = routes;