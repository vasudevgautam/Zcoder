const mongoose = require("mongoose");

const userVerificationSchema = mongoose.Schema({
    userId : String,
    uniqueString : String,
    createdAt : Date,
    expiresAt : Date
})

const Userverification = mongoose.model('Userverification', userVerificationSchema);

module.exports = Userverification