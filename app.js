const express = require('express');
const session = require('express-session');
const Response = require('./lib/Response');
const dotenv = require('dotenv');

// dotenv.config({path: './.env.development.local'})

// this is for testing purposes only
// if(process.env.NODE_ENV !== 'production') {
//     const mongoose = require('mongoose');
//     mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.log(err));
// } 

const app = express();

app.use(express.json())

app.use(session({
    secret:process.env.SESSION_SECRET || 'spagettios',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.get('/test', (req,res) => {
    const response = new Response(200, 'test', {test: 'test'}, {error: 'test'});
    response.send(res);
})

app.use('/api/auth', require('./routes/AuthRouter'));
app.use('/api/users', require('./routes/UserRouter'));
app.use('/api/machines', require('./routes/MachineRouter'));

// catch all 404 handler
app.use((req,res) => {
    const response = new Response(404, 'Not Found', null, {error: 'Not Found'});
    response.send(res);
})

// global error handler
app.use((err, req, res, next) => {
    let response = null
    if(err){
        response = new Response(400, err.message, null, {error: err});
    } else {
        response = new Response(500, 'unknown error',null, {error: 'Rougue Bannana'} )
    }
    response.send(res);
})


module.exports = app