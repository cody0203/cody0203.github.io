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
        let searched = false;
        let matchedUsers = db.get('users').value().filter(user => {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        })
        if (matchedUsers.some(item => item !== {})) {
            existedName = true;
        } else {
            existedName = false;
        }

        if (matchedUsers) {
            searched = true;
        } else {
            searched = false;
        }

        res.render('users/index', {
            users: matchedUsers,
            q,
            existedName,
            searched
        })
        console.log(matchedUsers)
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
        let request = req;
        request.body.id = shortid.generate();
        request.body.avatar = request.file.path.split("/").slice(1).join("/");
        db.get('users').push(request.body).write();
        res.redirect('/users');
    }
};