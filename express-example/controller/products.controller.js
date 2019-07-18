const db = require('../db');
const shortid = require('shortid');

module.exports = {
    get: (req, res) => {
        res.render('products/index', {
            products: db.get("products").value()
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