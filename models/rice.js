const mongoose = require('mongoose')

const riceSchema = new mongoose.Schema({
    amount: Number,
    price: Number
})

const Rice = mongoose.model('Rice', riceSchema);

module.exports = Rice