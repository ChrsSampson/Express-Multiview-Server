const bcrypt = require('bcrypt');
const User = require('../models/User');
const {v4} = require('uuid');

async function login (username, plainPassword) {
    try{
    // find user in database
        const user = await User.find({'username': username});
        if(user.session){
            throw new Error('User already logged in');
        }

    // compare plainPassword with hashed password
        const u = new User(user[0]); // a bit scuffed, doing this in order to use class methods

        if(user){
            const match = await u.comparePassword(plainPassword);
     // if match, create user session
            if(match) {
                // generate session id with UUID  
                const session = v4();
                const updatedUser = await User.findByIdAndUpdate(u._id, {session}, {new: true});
                return updatedUser;
            } else {
                throw new Error('Invalid username or password');
            }
        } else {
            throw new Error('Invalid username or password');
        }
    } catch(err) {
        throw err;
    }
}

async function logout (session) {
    try{
        // find user by session 
        const user = await User.find({'session': session});
        // delete session
        const updatedUser = await User.findByIdAndUpdate(user._id, {session: null});
        return updatedUser;
    } catch (err) {
        throw err;
    }
    
}

function resetPassword (id, plainPassword) {
    try{
    // find user by id
        throw new Error('Not implemented');
    // hash password
    // update user in database
    } catch (err) {
        throw err;
    }
}


module.exports = {login, logout, resetPassword }