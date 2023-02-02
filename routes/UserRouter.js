// user crud router
const express = require('express');
const Response = require('../lib/Response');
const {GetAll} = require('../controllers/UserController');

const router = express.Router();

// get list of all users
router.get('/', async (req,res) => {
    try{
        const user = await GetAll();
        const response = new Response(200, 'Success', user, null);
        response.send(res);
    } catch(err) {
        const response = new Response(500, 'Internal Server Error', null, {error: err});
        response.send(res);
    }
});

module.exports = router;