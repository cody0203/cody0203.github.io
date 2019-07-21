let mongoose = require("mongoose");

let userID = mongoose.SchemaTypes.ObjectId;

let userSchema = new mongoose.Schema({
    id: userID,
    name: String,
    phone: String,
    email: String,
    password: String,
    avatar: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;