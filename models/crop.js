const mongoose = require('mongoose')

const cropSchema = new mongoose.Schema({
    crop: String,
    amount: Number,
    price: Number
})

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop 