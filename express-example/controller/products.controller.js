const db = require('../db');
const shortid = require('shortid');

module.exports = {
    get: (req, res) => {
        let page = parseInt(req.query.page) || 1;
        let perPage = 8;
        let maxPage = Math.ceil(db.get("products").value().length / perPage)
        console.log(maxPage);
        let start = (page - 1) * perPage;
        let end = page * perPage;
        res.render('products/index', {
            products: db.get("products").value().slice(start, end),
            page: page,
            maxPage: maxPage
        });
    },
    view: (req, res) => {
        let id = req.params.id;
        let product = db.get("products").find({ id: id }).value();
        res.render('products/view', {
            product: product
        })
    },
    getCreateProducts: (req, res) => {
        res.render('products/create')
    },
    postCreateProducts: (req, res) => {
        req.body.id = shortid.generate();
        db.get('products').push(req.body).write();
        res.redirect('/products')
    }
}