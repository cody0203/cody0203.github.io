const md5 = require("md5");

const User = require("../Models/users.model");

module.exports = {
    login: (req, res) => {
        res.render("auth/login");
    },
    postLogin: async (req, res, next) => {
        let email = req.body.email;
        let password = req.body.password;

        let user = await User.find({ email: email });
        if (!user[0].email) {
            res.render("auth/login", {
                errors: [
                    "User does not exist."
                ],
                values: req.body
            });
            return;
        }

        let hashedPassword = md5(password)

        if (user[0].password !== hashedPassword) {
            res.render("auth/login", {
                errors: [
                    "Wrong password."
                ],
                values: req.body
            });
            return;
        }

        let userCookie = user[0]["_id"].toString();

        res.cookie("userId", userCookie, {
            signed: true
        })
        res.redirect("/users");
    }
}