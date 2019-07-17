let express = require('express')
let routes = express();
let controller = require("../controller/users.controller")

routes.get('/', controller.index);

routes.get('/search', controller.search);

routes.get("/create", controller.getCreate);

routes.get("/:id", controller.view);

routes.post("/create", controller.postCreate);

module.exports = routes;