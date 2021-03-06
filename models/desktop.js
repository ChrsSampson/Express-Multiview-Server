const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DesktopSchema = new Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    link:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default: Date.now
    },
    updated: Date
})


const Desktop = mongoose.model('Desktop', DesktopSchema)

module.exports = Desktop