import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import products from './data/products.js'

//define port
const port = process.env.PORT || 5001

//call connectDB
connectDB()

//initalise express
const app = express()

//create routes
//home
app.get('/', (req, res) => {
    res.send('API is running...')
})

//all products
app.get('/api/products', (req, res) => {
    res.json(products)
})

//one product
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

//start server
app.listen(port, () => console.log(`Server running on port ${port}`))