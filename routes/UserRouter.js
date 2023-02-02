// user crud router
const express = require('express');
const Response = require('../lib/Response');
const asyncHandler = require('../lib/AsyncHandler');
const {getAll, create, findById, deleteById} = require('../controllers/UserController');
const { Router } = require('express');

const router = Router();

// get list of all users
router.get('/', asyncHandler( async (req,res, next) => {
    try{
        const user = await getAll();
        const response = new Response(200, 'Success', user, null);
        response.send(res);
    } catch(err) {
        next(err);
    }
}));

// create a new user
router.post('/', asyncHandler( async (req, res, next) => {
    try{
        const {username, password, displayName} = req.body;
        if(!username || !password) {
            const error = new Error('Missing Required Field (username, password)')
            next(error)
        }

        const userInfo = {
            email: username,
            password: password,
            displayName: displayName
        }
        
        const user = await create(userInfo);
        const response = new Response(201, 'Success', user, null);
        response.send(res);
    } catch(err) {
        next(err)
    }
}));

// get user by id
router.get('/:id', asyncHandler ( async (req, res) => {
    try{
        const {id} = req.params
        if(!id){
            const error = new Error('Missing Required Field (id)')
            next(error)
        }
        const user = await findById(id)
        const response = new Response(200, 'Success', user, null)
        response.send(res)
    } catch (err) {
        next(err)
    }
}));

// delete user by id
router.delete('/:id', asyncHandler(async (req, res, next) => {
    try{
        const {id} = req.params
        if(!id) {
            const error = new Error('Missing Required Field (id)')
            next(error)
        }
        const r = await deleteById(id)
        const response = new Response(200, 'Success', r, null)
        response.send(res)
    } catch (err) {
        next(err)
    }
}));

module.exports = router;