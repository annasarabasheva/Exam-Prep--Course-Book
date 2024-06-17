const User = require('../models/User');


exports.getUser = (userID) => User.findById(userID).populate(['createdCourses', 'signUpCourses']);