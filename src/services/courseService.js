const Course = require('../models/Course');
const User = require('../models/User');

exports.create = async (userID, courseData) => {
    
    const createdCourse = await Course.create({ //PO TOZI NACHIN AKTIVIRAME RELACIQTA KUM OWNER-A
        owner: userID,
        ...courseData
    });

    //sega trqbva da napravim i obratnata relaciq kum usera i po-konkretni createdCourses:

    await User.findByIdAndUpdate(userID, {$push: {createdCourses: createdCourse._id}})
};


exports.getAll = () => Course.find();

exports.getLatest = () => Course.find().sort({ createdAt: -1 }).limit(3);

exports.getOne = (courseID) => Course.findById(courseID).populate('owner').populate('signUpList');

exports.delete = async (userID, courseID) => {

        const deletedCourse = await Course.findByIdAndDelete(courseID);
        await User.findByIdAndUpdate(userID, {$pull: {createdCourses: deletedCourse._id}})
    };

exports.edit = async(courseID, editedData) => {

    await Course.findByIdAndUpdate(courseID, editedData, {runValidators: true}); //ZADULJITELNO IZPOLZVAI runValidators; TRUE zashtoto inache validaciqta otpada i ne raboti
};


exports.signUP = async(courseID, userID) => {
    await Course.findByIdAndUpdate(courseID, {$push: {signUpList: userID}});
    await User.findByIdAndUpdate(userID, {$push: {signUpCourses: courseID}});


}