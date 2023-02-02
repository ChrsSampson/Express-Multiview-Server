const bycrpyt = require('bcryptjs');

function Login (username, plainPassword) {
    // find user in database
    // compare plainPassword with hashed password
    // if match, create user session
}

function Logout () {
    // destory user session
}

function CreateAccount (username, email, plainPassword) {
    // hash password
    // create user in database
}

function ResetPassword (id, plainPassword) {
    // find user by id 
    // hash password
    // update user in database
}

function Update (id, data) {
    // find user by id and update with data
}

module.exports = {Login}