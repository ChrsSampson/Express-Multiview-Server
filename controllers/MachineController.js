const Machine = require('../models/Machine');
const Response = require('../lib/Response');

async function create(req, res, next ) {
    try {
        const {name, link, tag} = req.body;

        if(!name || !link) {
            const err = new Error('Missing required fields (name, link)');
            next(err);
            return
        }

        const newMachine = await Machine.create({name, link, tag});
        const response = new Response(201, 'Machine created', newMachine);
        response.send(res);
    } catch (err) {
        throw err;
    }
}

async function findAll(req, res, next) {
    try {
        const machines = await Machine.find({})
        const response = new Response(200, 'Machines found', machines);
        response.send(res);
    } catch (err) {
        throw err;
    }
}

async function findByTag(req, res, next) {
    try{
        const { tag } = req.params
        if(!tag) {
            const err = new Error('Missing required fields (tag)');
            next(err);
            return
        } else {
            const machines = await Machine.find({tag: tag});
            const response = new Response(200, 'Machines found', machines);
            response.send(res);
        }
    } catch(err) {
        throw err;
    }
}

async function findById(req, res, next) {
   try {
        const {id} = req.params;
        if(!id) {
            const err = new Error('Missing required fields (id)');
            next(err);
            return
        }

        const result = await Machine.findById(id);
        const response = new Response(200, 'Machine found', result);
        response.send(res);
   } catch (err) {
        throw err;
   }
}

async function updateById(req, res ,next) {
    try {
        const {id} = req.params;

        if(!id) {
            const err = new Error('Missing required fields (id)');
            next(err);
            return
        }

        const {name, link, tag} = req.body;

        const info = {name, link, tag};

        const updatedMachine = await Machine.findByIdAndUpdate(id, info, {new: true});
        const response = new Response(200, 'Machine updated', updatedMachine);
        response.send(res);
    } catch(err){
        throw err;
    }
}

async function deleteById(req, res, next) {
    try {
        const {id} = req.params;

        if(!id) {
            const err = new Error('Missing required fields (id)');
            next(err);
            return
        }

        const deletedMachine = await Machine.findByIdAndDelete(id);
        const response = new Response(200, 'Machine deleted', deletedMachine);
        response.send(res);
    } catch(err){
        throw err;
    }
}

module.exports = { findAll, findById, create, updateById, deleteById, findByTag }