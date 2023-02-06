// user data model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    displayName: {
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
    },
    session: {
        type:String,
        required: false
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

UserSchema.method('comparePassword',  async function(plainPassword) {
    const user = this;
    const match = await bcrypt.compare(plainPassword, user.password);
    return match;
});

module.exports = mongoose.model('User', UserSchema);