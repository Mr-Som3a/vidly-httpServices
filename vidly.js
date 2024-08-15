const express = require('express')
const validation = require('./validation')

const http = express()

http.use(express.json())

const url = '/api/genres/'

const genres = [
    {id:1,name:'Action'},
    {id:2,name:'Comedy'},
    {id:3,name:'Romantic'},
]

http.get(`${url}`, (req, res) => {
    res.send(genres)
})
http.post(`${url}`, (req, res) => {
    const genre = {
        id: req.body.id,
        name: req.body.name
    }
    const { error } = validation(genre)
    if (!error) {
        genres.push(genre)
        return res.send(genres)
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
// http.delete(`${url}`, (req, res) => {
    
// })

const port = process.env.PORT || 5080;
http.listen(port, () => console.log("listening on port "+port+"..."))


