let mongoose = require("mongoose");
let Int32 = require('mongoose-int32');

var products = new mongoose.Schema({ productId: Map });

let sessionSchema = new mongoose.Schema({
    child: products
});

let Session = mongoose.model('Session', sessionSchema);

module.exports = Session;