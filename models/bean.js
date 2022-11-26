const mongoose = require('mongoose')

const beanSchema = new mongoose.Schema({
    amount: Number,
    price: Number
})

const Bean = mongoose.model('Bean', beanSchema);

module.exports = Bean