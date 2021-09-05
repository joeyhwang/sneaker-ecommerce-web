const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const orderSchema = new mongoose.Schema({
    number: {
        type: Number,

    },
    checkoutSession: {
        type: String,
        required: true,
        unique: true 
    },
    date: Date,
    status: String,
    email: String,
    shipping: 
    {
        city: String,
        country: String,
        line1: String,
        line2: String,
        postal_code: String,
        state: String
    },

})

const Order = mongoose.model('order', orderSchema)

module.exports = Order
