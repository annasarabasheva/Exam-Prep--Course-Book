const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const SECRET = 'shjdsikwhjdwhnfkwfjlwfje/554adwsf'

exports.register = async (userData) =>  {
    if(userData.password != userData.rePassword) {
        throw new Error('Password missmatch');
    }
    const user = await User.findOne({email: userData.email});
    if(user) {
        throw new Error('User already exists')
    };

    return User.create(userData)
};



exports.login = async ({email, password}) => {
        //GET USER FROM  DB
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('Username or password is invalid')
        }
        //CHECK PASSWORD

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) {
            throw new Error('Username or password is invalid')
        }

        //GENERATE TOKEN
        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = await jwt.sign(payload, SECRET, {expiresIn: '2h'});

        //RETURN TOKEN
        return token


}
