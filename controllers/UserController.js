// user Crud Operations
const User = require('../models/User');


/*
    * Get all users
    * @returns {Promise} - Promise object represents list of users
*/
async function GetAll () {
    try{
        const user = await User.find({});
        return user;
    } catch(err) {
        throw err;
    }
}


module.exports = {GetAll}