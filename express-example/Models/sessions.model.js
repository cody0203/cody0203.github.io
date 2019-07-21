let mongoose = require("mongoose");
let Int32 = require('mongoose-int32');
let productMixed = mongoose.SchemaTypes.Mixed;

let sessionSchema = new mongoose.Schema({
    cart: [{
        productRecords: productMixed
    }]
});

let Session = mongoose.model('Session', sessionSchema);

module.exports = Session;