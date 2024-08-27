const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const router = express()

mongoose.connect('mongodb://localhost/users')
    .then(() => console.log('connected to mongodb...'))
    .catch((err) => console.log('not connected to DB...', err))


const User= mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlength:255,
    },
    email: {
        type: String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:5,
        maxlength:1024,
    },
}))
// #############################################

const schema = Joi.object({
    name:Joi.string().min(5).max(255).required(),
    email:Joi.string().email().min(5).max(255).required(),
    password:Joi.string().min(4).min(5).max(255).required(),
})

function validate(object) {
    return schema.validate(object)
}
// #############################################

const url = '/api/users'

router.get(`${url}`,async (req,res)=>{
    const users = await Users.find()
    res.send(users)
})
router.post(`${url}`,async (req,res)=>{
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    const {error} = validate(user)
    if(!error){
        const result = await user.save()
        res.send(result)
    }
    res.status(400).send('bad Requestoo')
})

router.listen(4000,()=>console.log('listening on port 4000'))