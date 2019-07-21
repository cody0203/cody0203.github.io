let mongoose = require("mongoose");

let productID = mongoose.SchemaTypes.ObjectId;
var Int32 = require('mongoose-int32');

let productSchema = new mongoose.Schema({
    id: productID,
    name: String,
    image: String,
    description: String,
    price: Int32,
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;