const User = require('../models/User');
const Response = require('../lib/Response');

module.exports  = function (req, res, next) {
    const {session} = req.cookies;

    console.log('Session', session);

    if(!session) {
        const response = new Response(401, 'Error: Unauthorized', null, {error: 'Unauthorized'});
        response.send(res);
        return
    }

    User.find({'session': session})
        .then(user => {
            if(user[0].session === session) {
                req.role = user[0].role;
                next()
            } else {
                const response = new Response(401, 'Error: Session Mismatch', null, {error: 'Unauthorized'});
                response.send(res);
                return
            }
        })
        .catch(err => {
            next(err)
        })
}