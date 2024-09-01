const express = require('express')
const { Genre,validate }= require('../models/genres')
const router = express()


router.get(`/`,async (req, res) => {
    const genres = await Genre.find()
    res.send(genres)
})
router.post(`/`, async (req, res) => {
    const { error } = validate(req.body)
    if (!error) {
        let genre = new Genre({
            name: req.body.name
        })
        genre = await genre.save()
        return res.send(genre)
    }
    res.status(400).send(error.details[0].message)

})
router.put(`/:id`, async (req, res) => {
    const { error } = validate({ name: req.body.name })
    
    if (!error) {
        const genre =await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        if (genre == null) {
            res.status(404).send('This item is not found')
        }
        return res.send(genre)
    }
    res.status(400).send(error.details[0].message)

})

router.delete(`/:id`, async (req, res) => {
    
    const genre= await Genre.findByIdAndDelete(req.params.id)
    if (genre == null) {
        res.status(404).send('This item is not found')
    } 
    res.send(await Genre.find())

})


module.exports = router