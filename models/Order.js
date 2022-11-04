const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    segment: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    product: {
        type: String,
    },
    discountBand: {
        type: String,
    },
    unitSold: {
        type: Number,
    },
    manufacturingPrice: {
        type: String,
    },
    salesPrice: {
        type: String,
    },
    grossSales: {
        type: String,
    },
    sales: {
        type: String,
    },
    cogs: {
        type: String,
    },
    monthNumber: {
        type: Number,
    },
    monthName: {
        type: String,
    },
    year: {
        type: Number,
    },
    date: {
        type: String,
    }
})

module.exports = mongoose.model('orders', orderSchema)