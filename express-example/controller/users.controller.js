const db = require('../db')
const shortid = require('shortid');

module.exports = {
    index: (req, res) => {
        res.render('users/index', {
            users: db.get('users').value()
        })
    },
    search: (req, res) => {
        let q = req.query.q;
        let existedName;
        let disabled;
        let matchedUsers = db.get('users').value().filter(user => {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        })
        if (matchedUsers.some(item => item !== {})) {
            existedName = true;
        } else {
            existedName = false;
        }
        res.render('users/index', {
            users: matchedUsers,
            q,
            existedName
        })
    },
    getCreate: (req, res) => {
        res.render("users/create")
    },
    view: (req, res) => {
        let id = req.params.id;
        let user = db.get('users')
            .find({ id: id })
            .value()
        res.render("users/view", {
            user: user
        })
    },
    postCreate: (req, res) => {
        req.body.id = shortid.generate();

        let errors = [];
        if (!req.body.name) {
            errors.push("Name is required!")
        }

        if (!req.body.phone) {
            errors.push("Phone is required!")
        } else if (req.body.phone.match(/((09|03|07|08|05)+([0-9]{8})\b)/g) === null) {
            errors.push("Phone is invalid")
        }

        if (errors.length) {
            res.render("users/create", {
                errors: errors,
                values: req.body
            })
            return;
        }
        db.get('users').push(req.body).write();
        res.redirect('/users');
    }
};