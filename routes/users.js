const express = require('express')
const {User,validate}=require('../models/users')
const router = express()




router.get(`/me`,async (req, res) => {
    const users = await User.find()
    res.send(users)
})
router.post(`/`, async (req, res) => {

    const { error } = validate(req.body)
    if(!error){
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
        res.send(user)

    }
    res.status(400).send(error.details[0].message)
})


module.exports = router