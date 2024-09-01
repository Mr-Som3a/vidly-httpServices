const express = require('express')
const mongoose = require('mongoose')
const Users = require('./routes/users')
const Genres = require('./routes/genres')
const Customers = require('./routes/customers')
const Movies = require('./routes/movies')
const Rentals = require('./routes/rentals')
const app = express()


// mongoose.connect('mongodb://127.0.0.1:27017/vidlyApp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to DB...'))
// .catch((ex) => console.log('Not connecting to DB...', ex));
mongoose.connect('mongodb://127.0.0.1:27017/vidlyApp')
    .then(() => console.log('connecting to DB...'))
    .catch((ex) => console.log('not connecting DB...', ex))


app.use(express.json())
app.use('/api/users',Users)
app.use('/api/genres',Genres)
app.use('/api/customers',Customers)
app.use('/api/movies',Movies)
app.use('/api/rentals',Rentals)


const port = process.env.PORT || 5080;
app.listen(port, () => console.log("listening on port "+port+"..."))