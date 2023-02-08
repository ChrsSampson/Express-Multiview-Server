// user crud router
const express = require('express');
const Response = require('../lib/Response');
const asyncHandler = require('../lib/AsyncHandler');
const {getAll, create, findById, deleteById, updateById} = require('../controllers/UserController');
const { Router } = require('express');
const privilegeCheck = require('../middleware/privilegeCheck');

const router = Router();

// get list of all users
router.get('/', asyncHandler( async (req,res, next) => {
    try{
        getAll(req, res, next);
    } catch(err) {
        next(err);
    }
}));

// create a new user
router.post('/', privilegeCheck, asyncHandler( async (req, res, next) => {
    try{
        create(req, res, next);
    } catch(err) {
        next(err)
    }
}));

// get user by id
router.get('/:id', asyncHandler ( async (req, res, next) => {
    try{
        findById(req, res, next);
    } catch (err) {
        next(err)
    }
}));

// update user by id
router.put('/:id', asyncHandler(async (req, res, next) => {
    try{
        updateById(req, res, next);
    } catch (err) {
        console.log(err)
        next(err)
    }
}));

// delete user by id
router.delete('/:id', privilegeCheck, asyncHandler(async (req, res, next) => {
    try{
        deleteById(req, res, next);
    } catch (err) {
        next(err)
    }
}));

module.exports = router;