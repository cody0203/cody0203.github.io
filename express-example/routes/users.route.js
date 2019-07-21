let express = require('express')
let routes = express();
let multer = require('multer');
let upload = multer({ dest: 'public/uploads' })

let controller = require("../controller/users.controller")
let validation = require("../validation/users.validation")

routes.get('/', controller.index);

routes.get('/search', controller.search);

routes.get("/create", controller.getCreate);

routes.get("/:id", controller.view);

routes.post("/create",
    upload.single('avatar'),
    validation.postCreate,
    controller.postCreate);

module.exports = routes;