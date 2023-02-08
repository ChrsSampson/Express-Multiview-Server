const Response = require('../lib/Response');


module.exports = function (req, res, next) {
    if(req.role === 'admin') {
        next();
    } else {
        const response = new Response(403, 'Error: Forbidden', null, {error: 'Forbidden'});
        response.send(res)
        return
    }
} 