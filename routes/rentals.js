const express= require('express')
const mongoose= require('mongoose')

const {Rental,validate} = require('../models/rentals')
const {Customer} = require('../models/customers')
const {Movie} = require('../models/movies')
const router = express()

router.get(`/`,async (req, res) => {
    const rentals = await Rental.find()
    res.send(rentals)
})
router.post(`/`, async (req, res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const customer = await Customer.findById(req.body.customerId)
    const movie = await Movie.findById(req.body.MovieId)
    if(!customer && !movie){
        res.status(400).send('Invild entries')
    }
    if(movie.numberInStock === 0 ){
        res.status(400).send("Movie is't in stock")
    }
        let rental = new Rental({
            customer:{
                _id:customer._id,
                name:customer.name,
                phone:customer.phone,
            },
            movie:{
                _id:movie._id,
                title:movie.title,
                dailyRentalRate:movie.dailyRentalRate
            }
        })
    
        
        rental = await rental.save()
        movie.numberInStock--
        movie.save()

})
router.put(`/:id`, async (req, res) => {
    const { error } = validate({ name: req.body.name })
    
    if (!error) {
        const rental =await Rental.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        if (rental == null) {
            res.status(404).send('This item is not found')
        }
        return res.send(rental)
    }
    res.status(400).send(error.details[0].message)

})

router.delete(`/:id`, async (req, res) => {
    
    const rental= await Rental.findByIdAndDelete(req.params.id, { name: req.body.name }, { new: true })
    if (rental == null) {
        res.status(404).send('This item is not found')
    } 
    res.send(await Rental.find())

})


module.exports = router