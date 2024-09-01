const express = require('express')
const {Customer,validate}= require('../models/customers')
const router = express()




router.get(`/`,async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
})
router.post(`/`, async (req, res) => {
    const { error } = validate(req.body)
    if (!error) {
        let customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold:req.body.isGold
        })
        customer = await customer.save()
        return res.send(customer)
    }
    res.status(400).send(error.details[0].message)

})
router.put(`/:id`, async (req, res) => {
    const { error } = validate(req.body)
    
    if (!error) {
        const customer =await Customer.findByIdAndUpdate(req.params.id, { 
            name: req.body.name,
            phone: req.body.phone,
            isGold:req.body.isGold
        }, { new: true })
        if (customer == null) {
            res.status(404).send('This item is not found')
        }
        return res.send(customer)
    }
    res.status(400).send(error.details[0].message)

})

router.delete(`/:id`, async (req, res) => {
    
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (customer == null) {
        res.status(404).send('This item is not found')
    } 
    res.send(await Customer.find().sort('name'))

})


module.exports = router