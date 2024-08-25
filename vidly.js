const express = require('express')
const validation = require('./validation')
const mongoose = require('mongoose')
const http = express()

http.use(express.json())

const url = '/api/genres/'

mongoose.connect('mongodb://localhost/gneres')
    .then(() => console.log('connecting to DB...'))
    .catch((err) => console.log('not connecting...', err))

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
http.put(`${url}:id`, (req, res) => {
    const genre = genres.find(e => e.id === parseInt(req.params.id))
    if (genre == null) {
        res.status(404).send('This item is not found')
    } else {
        genre.name = req.body.name
        const { error } = validation({ id: req.params.id, name: genre.name })
        if (!error) {
            return res.send(genre)
        }
        res.status(400).send(error.details[0].message)
    }

})
http.delete(`${url}:id`, (req, res) => {
    const genre= genres.find(e => e.id === parseInt(req.params.id))
    if (genre == null) {
        res.status(404).send('This item is not found')
    } else {
        const index = genres.indexOf(genre)
        genres.splice(index,1)
        res.send(genres)
    }

})

const port = process.env.PORT || 5080;
http.listen(port, () => console.log("listening on port "+port+"..."))


