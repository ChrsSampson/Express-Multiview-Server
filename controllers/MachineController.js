const Machine = require('../models/Machine');

async function create(data) {
    try {
        const machine = new Machine(data);
        await machine.save();
        return machine;
    } catch (err) {
        throw err;
    }
}

async function findAll() {
    try {
        const machines = await Machine.find();
        return machines;
    } catch (err) {
        throw err;
    }
}

async function findById(id) {
   try {
        const machine = await Machine.findById(id);
        return machine;
   } catch (err) {
        throw err;
   }
}

async function updateById(id, data = {}) {
    try {
        const machine = await Machine.findByIdAndUpdate(id, data, {new: true});
        return machine;
    } catch(err){
        throw err;
    }
}

async function deleteById(id) {
    try {
        const machine = await Machine.findByIdAndDelete(id);
        return machine;
    } catch(err){
        throw err;
    }
}

module.exports = { findAll, findById, create, updateById, deleteById }