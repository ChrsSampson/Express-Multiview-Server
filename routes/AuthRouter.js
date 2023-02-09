const express = require('express');
const Response = require('../lib/Response');
const asyncHandler = require('../lib/asyncHandler');

const router = express.Router();

const  {login, logout, resetPassword} = require('../controllers/AuthController');

//  api/auth/login
router.post('/login', asyncHandler( async (req,res, next) => {
    try{
        const {username, password} = req.body;

        if(!username || !password) {
            const response = new Response(400, 'Username and password required', null, {error: 'Username and password required'});
            response.send(res);
            return;
        }

        const result = await login(username, password);

        // set a cookie with the session id
        res.cookie('session', result.session, {expires: new Date(Date.now()+ 90000), httpOnly: true});

        const response = new Response(200, 'Login Successful', result, null);
        response.send(res);

    } catch (err) {
        next(err);
    }
}));  

router.post('/logout', asyncHandler( async (req,res, next) => {
    try{
        const {session} = req.cookies;
        if (session) {
            const result = await logout(session);
            res.clearCookie('session');
            const response = new Response(200, 'Logout Successful', result, null);
            response.send(res);
        } else {
            throw new Error('Missing Required Field (Active Session)');
        }
    } catch (err) {
        throw err
    }
}));

// gets the currently logged in user
router.get('/me', asyncHandler( async (req,res, next) => {
    res.send('Not Implemented');
}));

// router 404 handler
router.use((req,res) => {
    const response = new Response(404, 'Method Not Supported', null, {error: 'Method Not Supported'});
    response.send(res);
});

module.exports = router;