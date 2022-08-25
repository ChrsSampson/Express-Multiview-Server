var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();
const plantSeeds = require('../dataHelpers')
const catchAsync = require('../utils/catchAsync')
// Models
const User = require('../models/user')

// for testing remove later
const seeds = require('../seeds.json');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');
const sendMail = require('../middleware/sendEmail');

// ------------------------
// TESTING - Remove later
router.get('/seed', isLoggedIn, (req,res, next) => {
  res.render('test/seed')
})
// Seed Database Router
router.post('/seed', catchAsync(async (req, res, next) => {
  await plantSeeds()
  res.send('planted')
}))

// Test route
router.get('/mailtest', (req, res, next) => {
  res.render('test/testForm')
})

router.post('/testreport', isLoggedIn, sendMail('report'), (req, res) => {
  req.flash('info', 'Attempting to send email')
  res.redirect('/computers/mailtest')
})

// Create new Encoders
router.get('/new', isLoggedIn, isAdmin, (req, res) => {
  res.render('settings/newEncoder')
})

router.post('/new', isLoggedIn, isAdmin, (req, res) => {
  const [user] = req.body
  const newUser = new User(User)
  newUser.save()
})


module.exports = router;
