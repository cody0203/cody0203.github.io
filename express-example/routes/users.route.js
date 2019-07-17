let express = require('express')
let routes = express();
const shortid = require('shortid');

let db = require('../db')

routes.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}
);

routes.get('/search', (req, res) => {
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

routes.get("/create", (req, res) => {
    res.render("users/create")
});

routes.get("/:id", (req, res) => {
    let id = req.params.id;
    let user = db.get('users')
        .find({ id: id })
        .value()
    res.render("users/view", {
        user: user
    })
})

routes.post("/create", (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

module.exports = routes;