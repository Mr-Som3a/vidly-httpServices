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
// http.put(`${url}`, (req, res) => {
    
// })
// http.delete(`${url}`, (req, res) => {
    
// })

const port = process.env.PORT || 5080;
http.listen(port, () => console.log("listening on port "+port+"..."))


