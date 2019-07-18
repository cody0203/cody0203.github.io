let express = require('express')
let routes = express();
let controller = require("../controller/products.controller")

routes.get("/", controller.get);
routes.get('/create', controller.getCreateProducts)
routes.get('/:id', controller.view)

routes.post('/create', controller.postCreateProducts)

module.exports = routes;