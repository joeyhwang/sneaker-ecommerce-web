const mongoose = require('mongoose')
const sneakerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    style: {
        type: String,
        required: true,
        unique: true
    },
    brands: {
        type: [String],
        required: true
    },
    sizes: {
        type: [Number],
        required: true
    },
    retailPrice: {
        type: Number,
        required: true
    },
    colorway: {
        type: String,
        required: true
    },
    prices: {
        type: [Number],
        required: true
    },
    quantities: {
        type: [Number],
        required: true
    },
    imageUrls: {
        type: [String],
        required: true
    }
    

})

const Sneaker = mongoose.model('sneaker', sneakerSchema)

module.exports = Sneaker;
