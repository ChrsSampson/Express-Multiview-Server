const express= require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')

const catchAsync = require('../utils/catchAsync');
const { session } = require('passport');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');
const sendMail = require('../middleware/sendEmail');

// Forms
router.get('/', (req, res) => {
    res.render('login/login')
})

router.get('/register', isLoggedIn, isAdmin,  (req, res) => {
    res.render('login/register')
});

// User Login
router.post('/', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), (req, res) => {
    req.flash('success', `Logged in as "${req.body.username}"`)
    res.redirect('/viewer')
});



// Register User Account
router.post('/register', catchAsync( async (req, res) => {
    try{
        const {username, email, password, role} = req.body;
        const user = new User({username, email, role})
        const registeredUser = await User.register(user, password);
        req.flash('success', 'User Created')
        res.redirect('/viewer')
    }
    catch(e){
        console.log(e)
        req.flash('error', e.message)
        res.redirect('/login/register')
    }
}));

// DeSerialize User
router.post('/logout', (req,res) => {
    req.logout();
    req.flash('info', 'You have been logged out')
    res.redirect('/viewer')
});

// Password Reset
router.post('/reset/:id', isAdmin, catchAsync( async (req,res) => {
    const {id} = req.params
    try{
        const foundUser = await User.findById({_id: id})
        console.log(foundUser.username)
        foundUser.setPassword(req.body.pass, function (){
            foundUser.save()
            req.flash('success', `${foundUser.username} Password reset`)
            res.redirect('/viewer')
        })
        
    }
    catch(err){
        req.flash('error', "Password Change Failed: ", err.message)
        res.redirect(`/settings/users/${id}`)
    }
}));



module.exports = router