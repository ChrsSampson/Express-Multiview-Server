const express = require('express');
const session = require('express-session');
const Response = require('./lib/Response');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authCheck = require('./middleware/authCheck');

const app = express();

app.use(express.json())

app.use(cookieParser());

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
app.use('/api/users', authCheck, require('./routes/UserRouter'));
app.use('/api/machines', authCheck, require('./routes/MachineRouter'));

// catch all 404 handler
app.use((req,res) => {
    const response = new Response(404, 'Not Found', null, {error: 'Not Found'});
    response.send(res);
})

// global error handler
app.use((err, req, res, next) => {
    let response = null
    if(err){
        response = new Response(500, `Error: ${err.message}`, null, {error: {message: err.message, stack: err.stack}});
    } else {
        response = new Response(500, 'unknown error',null, {error: 'Rougue Bannana'} )
    }
    response.send(res);
})


module.exports = app