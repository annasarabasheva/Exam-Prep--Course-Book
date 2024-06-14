const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
});

userSchema.virtual('rePassword')
    .set(function(value) {
        
        if(value !== this.password) {
            throw new Error('Password missmatch !')
        }
    })



userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 12);

    this.password = hash;
});



const User = mongoose.model('User', userSchema);

module.exports = User;
