const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let name = "Cody";

let users = [
    { id: 1, name: "Cody" },
    { id: 2, name: "Linh" },
    { id: 3, name: "Dinh" },
    { id: 4, name: "Huy" },
];

app.get('/', (req, res) =>
    res.render('index', {
        name
    })
);

app.get('/users', (req, res) => {
        res.render('users/index', {
            users
        })
    }
);

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let existedName;
    let matchedUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    if (matchedUsers.some(item => item !== {})) {
        existedName = true;
        console.log("haha", matchedUsers)
    } else {    
        existedName = false
        console.log("hehe", matchedUsers)
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

app.post("/users/create", (req, res) => {
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));