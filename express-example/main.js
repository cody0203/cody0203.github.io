const express = require('express');
const app = express();
const port = 3000;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');
// Set some defaults (required if your JSON file is empty)
db.defaults({
    users: []})
    .write()

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let name = "Cody";

app.get('/', (req, res) =>
    res.render('index', {
        name
    })
);

app.get('/users', (req, res) => {
        res.render('users/index', {
            users: db.get('users').value()
        })
    }
);

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let existedName;
    let matchedUsers = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    if (matchedUsers.some(item => item !== {})) {
        existedName = true;
    } else {    
        existedName = false
    }
    res.render('users/index', {
        users: matchedUsers,
        q,
        existedName
    })
});

app.get("/users/create", (req, res) => {
    res.render("users/create")
});

app.get("/users/:id", (req, res) => {
    let id = req.params.id;
    let user = db.get('users')
        .find({ id: id })
        .value()
    res.render("users/view", {
        user: user
    })
})

app.post("/users/create", (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));