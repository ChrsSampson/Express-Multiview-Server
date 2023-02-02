const express = require('express');
const session = require('express-session');
const Response = require('./lib/Response');

const app = express();

app.use(session({
    secret:'changeme',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.get('/test', (req,res) => {
    const response = new Response(200, 'test', {test: 'test'}, {error: 'test'});
    response.send(res);
})

app.use('/api/auth', require('./routes/AuthRouter'));
app.use('/api/users', require('./routes/UserRouter'))


// catch all 404 handler
app.use((req,res) => {
    const response = new Response(404, 'Not Found', null, {error: 'Not Found'});
    response.send(res);
})

module.exports = app