var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash')
const methodOverride = require('method-override')

// Authentication Stuff
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user')

// Express instance
var app = express();

var enviroment = process.env.NODE_ENV
// ------------Connect To Mongo--------
const mongoose = require('mongoose');
const { serializeUser } = require('passport');
const { env } = require('process');
if(enviroment === "production"){
  mongoose.connect('mongodb+srv://root:CMhCS6aK2uAvjHcObbt0@multiviewer.haa1z.mongodb.net/multiviewer?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
}
else{
  mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false});
}

const db = mongoose.connection;
// Mongo Connection Monitoring
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection Open')
});

// -------------Session Config----------
const sessionConfig = {
  secret:'PlsNoShare',
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    // Session expires after 24 hours
    expires: Date.now() + 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24
  }
}
app.use(session(sessionConfig));

// ---------------Passport Config-------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
// Get a User In out out of Session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -----------------Flash Messages---------------
app.use(flash())

// Make these pieces of data availible on every request (if they exist)
app.use((req, res, next) => {
  // Currently logged in user
  res.locals.currentUser = req.user;
  // Flash messages
  res.locals.info = req.flash('info');
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

// ------Allow Cross Origin Access Control Header----------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//------------------- Routers (passes requests over to the routers)----------
app.get('/', (req, res) => {
  res.redirect('/viewer')
})

app.use('/viewer', require('./routes/viewer'));
app.use('/login', require('./routes/login'));
app.use('/settings', require('./routes/settings'));

// API Routes for possible future frontend, used for testing now
app.use('/computers', require('./routes/computers'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error : err});
});

module.exports = app;
