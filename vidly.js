const express = require('express')
const validation = require('./validation')
const mongoose = require('mongoose')
const http = express()

http.use(express.json())

const url = '/api/genres/'

mongoose.connect('mongodb://localhost/gneres')
    .then(() => console.log('connecting to DB...'))
    .catch((err) => console.log('not connecting DB...', err))

const genreSchema = new mongoose.Schema({
    name:String
})
const genreDB = new mongoose.model('Genre', genreSchema)



http.get(`${url}`,async (req, res) => {
    const genres = await genreDB.find()
    res.send(genres)
})
http.post(`${url}`, async (req, res) => {
    const { error } = validation(req.body)
    if (!error) {
        let genre = new genreDB({
            name: req.body.name
        })
        const result = await genre.save()
        return res.send(result)
    }
    res.status(400).send(error.details[0].message)

})
http.put(`${url}:id`, async (req, res) => {
    const { error } = validation({ name: req.body.name })
    
    if (!error) {
        const genre =await genreDB.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        if (genre == null) {
            res.status(404).send('This item is not found')
        }
        return res.send(genre)
    }
    res.status(400).send(error.details[0].message)

})

http.delete(`${url}:id`, async (req, res) => {
    
    const genre= await genreDB.findByIdAndDelete(req.params.id, { name: req.body.name }, { new: true })
    if (genre == null) {
        res.status(404).send('This item is not found')
    } 
    res.send(await genreDB.find())

})

const port = process.env.PORT || 5080;
http.listen(port, () => console.log("listening on port "+port+"..."))
