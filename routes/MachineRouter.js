const express = require('express');
const router = express.Router();
const Response = require('../lib/Response');
const asyncHandler = require('../lib/asyncHandler');

const { findAll, findById, create, updateById, deleteById } = require('../controllers/MachineController');


// @route   GET api/machines
router.get('/', asyncHandler( async (req, res, next) => {
    try{
        const machines = await findAll();
        res.json(machines);
    } catch (err) {
        next(err);
    }
}));

// @route POST api/machines
router.post('/', asyncHandler( async (req, res, next) => {
    try{
        const {name, link} = req.body;

        if(!name || !link) {
            const err = new Error('Missing required fields (name, link)');
            next(err);
            return
        }

        const newMachine = await create({name, link});
        const response = new Response(201, 'Machine created', newMachine);
        response.send(res);

    } catch (err) {
        next(err);
    }
}));

// @route GET api/machines/:id
router.get('/:id', asyncHandler( async (req, res, next) => {
    try{
        const machine = await findById(req.params.id);
        const response = new Response(200, 'Machine found', machine);
        response.send(res);
    } catch (err) {
        next(err);
    }
}));

// @route PUT api/machines/:id
router.put('/:id', asyncHandler( async (req, res, next) => {
    try{
        const {id} = req.params;

        if(!id) {
            const err = new Error('Missing required fields (id)');
            next(err);
            return
        }

        const {name, link} = req.body;

        const info = {name, link};

        const updatedMachine = await updateById(id, info);
        const response = new Response(200, 'Machine updated', updatedMachine);
        response.send(res);
    } catch (err) {
        next(err);
    }
}));

// @route DELETE api/machines/:id
router.delete('/:id', asyncHandler( async (req, res, next) => {
    try{
        const machine = await deleteById(req.params.id);
        const response = new Response(200, 'Machine deleted', machine);
        response.send(res);
    } catch (err) {
        next(err);
    }
}));

module.exports = router;