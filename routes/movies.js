const express = require('express')
const {Movies,validate}= require('../models/movies')
const {Genre}=require('../models/genres')
const router = express()




router.get(`/`,async (req, res) => {
    const movies = await Movies.find()
    res.send(movies)
})
router.post(`/`, async (req, res) => {
    const { error } = validate(req.body)
    const genre = await Genre.findById(req.body.genreId)
    if(!genre){
        res.status(400).send('Invalid genreId')
    }
    if (!error) {
        let movie = new Movies({
            title: req.body.title,
            genre: {
                id:genre._id,
                name:genre.name
            },
            nubmerInStock:req.body.nubmerInStock,
            dailyRentalRate:req.body.dailyRentalRate
        })
        movie = await movie.save()
        return res.send(movie)
    }
    res.status(400).send(error.details[0].message)
})

router.put(`/:id`, async (req, res) => {
    const { error } = validate(req.body)
    
    if (!error) {
        const movie =await Movies.findByIdAndUpdate(req.params.id, { 
            title: req.body.title,
            genreId:req.body.genreId,
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate,
        }, { new: true })
        if (movie == null) {
            res.status(404).send('This item is not found')
        }
        return res.send(movie)
    }
    res.status(400).send(error.details[0].message)

})

router.delete(`/:id`, async (req, res) => {
    
    const movie = await Movies.findByIdAndDelete(req.params.id)
    if (movie == null) {
        res.status(404).send('This item is not found')
    } 
    res.send(await Movies.find())

})


module.exports = router