require('dotenv').config()

const express = require('express');
const app = express();
const port = 3000;

var cookieParser = require('cookie-parser');
let usersRoute = require('./routes/users.route');
let authRoute = require('./routes/auth.route');
let productsRoute = require('./routes/products.route');

let authMiddlewares = require("./middlewares/auth.middlewares")

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECURE));
app.use(express.static('public'))

let name = "Cody";

app.use('/users', authMiddlewares.authRequired, usersRoute);
app.use('/auth', authRoute);
app.use('/products', productsRoute)

app.get('/', (req, res) =>
    res.render('index', {
        name
    })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));