const express = require('express');
const Response = require('../lib/Response');

const router = express.Router();




router.post('/login', (req,res) => {
    // const {username, password} = req.body;

    if(!username || !password) {
        const response = new Response(400, 'Username and password required', null, {error: 'Username and password required'});
        response.send(res);
        return;
    }


})


// router 404 handler
router.use((req,res) => {
    const response = new Response(404, 'Method Not Supported', null, {error: 'Method Not Supported'});
    response.send(res);
});

module.exports = router;