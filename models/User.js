// user data model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});

UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
    })
});

UserSchema.methods.comparePassword = function(plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    })
}

module.exports = mongoose.model('User', UserSchema);