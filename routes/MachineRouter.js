const express = require('express');
const router = express.Router();
const asyncHandler = require('../lib/asyncHandler');

const { findAll, findById, create, updateById, deleteById, findByTag } = require('../controllers/MachineController');


// @route   GET api/machines
router.get('/', asyncHandler( async (req, res, next) => {
    try{
        await findAll(req, res, next);
    } catch (err) {
        next(err);
    }
}));

router.get('/tag/:tag', asyncHandler( async (req, res, next) => {
    try{
        await findByTag(req, res, next);
    } catch (err) {
        next(err);
    }
}));

// @route POST api/machines
router.post('/', asyncHandler( async (req, res, next) => {
    try{
        await create(req, res, next);
    } catch (err) {
        next(err);
    }
}));

// @route GET api/machines/:id
router.get('/:id', asyncHandler( async (req, res, next) => {
    try{
        await findById(req, res, next);
    } catch (err) {
        next(err);
    }
}));

// @route PUT api/machines/:id
router.put('/:id', asyncHandler( async (req, res, next) => {
    try{
        await updateById(req, res, next);
    } catch (err) {
        next(err);
    }
}));

// @route DELETE api/machines/:id
router.delete('/:id', asyncHandler( async (req, res, next) => {
    try{
        await deleteById(req, res, next);
    } catch (err) {
        next(err);
    }
}));

module.exports = router;