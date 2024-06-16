const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        
  
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    signUpCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }],
    createdCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }]

});


userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 12);

    this.password = hash;
});



const User = mongoose.model('User', userSchema);

module.exports = User;
