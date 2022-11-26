const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    id: String,
    region: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User