const Product = require("../Models/products.model");

module.exports = {
    get: async (req, res) => {
        let page = parseInt(req.query.page) || 1;
        let perPage = 8;
        let products = await Product.find();
        let maxPage = Math.ceil(products.length / perPage)
        console.log(maxPage);
        let start = (page - 1) * perPage;
        let end = page * perPage;
        res.render('products/index', {
            products: products.slice(start, end),
            page: page,
            maxPage: maxPage
        });
    },
    // view: (req, res) => {
    //     let id = req.params.id;
    //     let product = db.get("products").find({ id: id }).value();
    //     res.render('products/view', {
    //         product: product
    //     })
    // },
    getCreateProducts: (req, res) => {
        res.render('products/create')
    },
    postCreateProducts: async (req, res) => {
        // let products = await Product.find()
        await Product.create(req.body);
        res.redirect('/products')
    }
}