const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const {SECRET} = require('../config');


exports.register = async (userData) =>  {
    if(userData.password !== userData.rePassword) {
        throw new Error('Password missmatch');
    }
    const user = await User.findOne({email: userData.email});
    if(user) {
        throw new Error('User already exists')
    };

    const createdUser =  await User.create(userData); //THIS IS FOR AUTOLOGIN WHEN REGISTER IS DONE
    const token = await generateToken(createdUser); //THIS IS FOR AUTOLOGIN WHEN REGISTER IS DONE

    return token; //THIS IS FOR AUTOLOGIN WHEN REGISTER IS DONE

};



exports.login = async ({email, password}) => {
        //GET USER FROM  DB
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('Email or password is invalid')
        }
        //CHECK PASSWORD

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) {
            throw new Error('Email or password is invalid')
        }

        //GENERETE AND RETURN TOKEN

        const token = await generateToken(user);

        return token;


};


function generateToken(user) {
    //GENERATE TOKEN
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }
    //RETURN TOKEN
    return jwt.sign(payload, SECRET, {expiresIn: '2h'});

   
};
