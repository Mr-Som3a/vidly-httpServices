const express = require('express')
const mongoose = require('mongoose')
const Genres = require('./routes/genres')
const Customers = require('./routes/customers')
const app = express()


mongoose.connect('mongodb://localhost/vidlyApp')
    .then(() => console.log('connecting to DB...'))
    .catch((err) => console.log('not connecting DB...', err))



app.use(express.json())
app.use('/api/genres/',Genres)
app.use('/api/customer/',Customers)



const port = process.env.PORT || 5080;
app.listen(port, () => console.log("listening on port "+port+"..."))
