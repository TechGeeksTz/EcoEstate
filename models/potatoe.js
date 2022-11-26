const mongoose = require('mongoose')

const potatoeSchema = new mongoose.Schema({
    amount: Number,
    price: Number
})

const Potatoe = mongoose.model('Potatoe', potatoeSchema);

module.exports = Potatoe