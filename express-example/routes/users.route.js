let express = require('express')
let routes = express();

let controller = require("../controller/users.controller")
let validation = require("../validation/users.validation")

routes.get('/', controller.index);

routes.get('/search', controller.search);

routes.get("/create", controller.getCreate);

routes.get("/:id", controller.view);

routes.post("/create", validation.postCreate, controller.postCreate);

module.exports = routes;