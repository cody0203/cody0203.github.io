const User = require("../Models/users.model")

module.exports = {
    index: async (req, res) => {
        let users = await User.find();
        res.render('users/index', {
            users: users
        })
    },
    search: async (req, res) => {
        let q = req.query.q;
        let existedName;
        let searched = false;
        let users = await User.find();
        let matchedUsers = users.filter(user => {
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
    view: async (req, res) => {
        let id = req.params.id;
        let users = await User.find({ _id: id });
        let user = users[0];
        res.render("users/view", {
            user: user
        })
    },
    postCreate: async(req, res) => {
        let request = req;
        request.body.avatar = request.file.path.split("/").slice(1).join("/");
        await User.create(request.body);
        res.redirect('/users');
    }
};