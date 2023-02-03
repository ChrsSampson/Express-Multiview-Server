// user Crud Operations
const User = require('../models/User');


/*
    * Get all users
    * @returns {Promise} - Promise object represents list of users
*/
async function getAll () {
    try{
        const user = await User.find({});
        return user;
    } catch(err) {
        throw err;
    }
}

/*
    *Create a new user
    @param {Object} data - user data
    @param {String} data.username - email address
    @param {String} data.password - password
    @param {String} data.firstName - first name
    @param {String} data.lastName - last name
    @returns {Promise} - Promise object represents the created user
*/
async function create (data) {
    try{
        const user = await User.create(data);
        return user;
    } catch(err) {
        throw err;
    }
}

/*
    *Lookup user by id
    @param {string} id - User id
    @returns {object} data - User 
*/
async function findById (id) {
    try{
        const user = await User.findById(id)
        return user
    } catch (err) {
        throw err
    }
}

/*
    *Delete user by id
    @param {string} id - User id
    @returns {object} data - Deleted User 
*/
async function deleteById (id) {
    try{
        const result = await User.findByIdAndDelete(id)
        return result
    } catch (err) {
        throw err
    }
}

/*
    *Update user by id
    @param {string} id - User id
    @param {object} data - User data
    @returns {object} data - Updated User
*/
async function updateById (id, data) {
    try{
        const updatedUser = await User.findByIdAndUpdate(id, data)
        return updatedUser
    } catch (err) {
        throw err
    }
}

module.exports = {getAll, create, findById, deleteById, updateById}