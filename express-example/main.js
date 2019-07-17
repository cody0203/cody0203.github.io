const express = require('express');
const app = express();
const port = 3000;
let usersRoute = require('./routes/users.route')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let name = "Cody";

app.use('/users', usersRoute)

app.get('/', (req, res) =>
    res.render('index', {
        name
    })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));