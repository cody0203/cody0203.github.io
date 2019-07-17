let express = require('express')
let routes = express();
let controller = require("../controller/auth.controller")

routes.get('/login', controller.login);
routes.post('/login', controller.postLogin)

module.exports = routes;