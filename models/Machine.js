// Machine Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: false,
        default: Date.now
    },
})

module.exports = mongoose.model('Machine', MachineSchema);

