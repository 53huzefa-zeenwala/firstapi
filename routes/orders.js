const express = require('express')
const Order = require('../models/Order')

const router = express.Router()

// route
router.post('/', async (req, res) => {
    const order = new Order({
        segment:  req.body.segment, 
        country:  req.body.country,
        product:  req.body.product, 
        discountBand:  req.body.discountBand, 
        unitSold:  req.body.unitSold, 
        manufacturingPrice:  req.body.manufacturingPrice, 
        salesPrice:  req.body.salesPrice, 
        grossSales:  req.body.grossSales, 
        cogs:  req.body.cogs, 
        monthNumber:  req.body.monthNumber, 
        monthName:  req.body.monthName, 
        year:  req.body.year, 
        date:  req.body.date,
    })
    try {
        const savedOrder = await order.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

module.exports = router