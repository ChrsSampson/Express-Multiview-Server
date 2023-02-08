const User = require('../models/User');

// setup admin user if not exists
module.exports = function () {
    User.find({role: 'admin'})
    .then(users => {
        if(users.length === 0) {
            const user = new User({
                email: 'admin',
                password: process.env.BUILD_IN_ADMIN_PW,
                role: 'admin'
            });
            user.save()
            .catch(err => {
                console.log(err);
            })
        }
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })
}