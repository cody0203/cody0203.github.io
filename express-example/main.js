require('dotenv').config()

const express = require('express');
const app = express();
const port = 3000;

var cookieParser = require('cookie-parser');
let mongoose = require("mongoose");
var Int32 = require('mongoose-int32');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

let usersRoute = require('./routes/users.route');
let authRoute = require('./routes/auth.route');
let productsRoute = require('./routes/products.route');
let cartRoute = require('./routes/cart.route');

let authMiddleware = require("./middlewares/auth.middlewares")
let sessionMiddleware = require("./middlewares/session.middleware")

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECURE));
app.use(express.static('public'))
app.use(sessionMiddleware);

let name = "Cody";

app.use('/users', authMiddleware.authRequired, usersRoute);
app.use('/auth', authRoute);
app.use('/products', productsRoute)
app.use('/cart', cartRoute)

app.get('/', (req, res) =>
    res.render('index', {
        name
    })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));