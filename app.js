const express = require("express")
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser")
app.listen(3000)
app.use(bodyParser.json())

//product route
const productsRoute = require('./routes/products')
app.use('/products', productsRoute)

// post route
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)

// order route
const ordersRoute = require('./routes/orders')
app.use('/orders', ordersRoute)

app.get('/', (req, res) => {
    res.send('We are on home')
})

//connect to db
mongoose.connect(
    // 'mongodb+srv://huzefaZeenwala:YVFju0VT5UNkd9w6@cluster0.diyac.mongodb.net/test',
    'mongodb+srv://huzefazeenwala:Rn4BzQJCIncAcouC@api.n8ekrsy.mongodb.net/test',
    {useNewUrlparser: true},
    () => console.log('connected to Db')
)
// Rn4BzQJCIncAcouC