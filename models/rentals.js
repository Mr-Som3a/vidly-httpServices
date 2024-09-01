const Joi = require('joi')
const mongoose = require('mongoose')
const {customerSchema}=require('../models/customers')
Joi.objectId = require('joi-objectid')(Joi)


const rentalSchema = new mongoose.Schema({
    customer:{
        type: customerSchema,
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:255,
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255,
            },
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now,
    },
    dateReturened:{
        type:Date,
    },
    rentalFee:{
        type:Number,
        min:0,
    }
})

const Rental = mongoose.model('Rental', rentalSchema)


const schema = Joi.object({
    customerId:Joi.objectId().required(),
    movieId:Joi.objectId().required(),
})

function validationRental(object) {
    return schema.validate(object)
}


module.exports.Rental = Rental
module.exports.validate = validationRental
module.exports.rentalSchema = rentalSchema
