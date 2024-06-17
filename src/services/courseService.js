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


exports.getAll = () => Course.find()


exports.getOne = (courseID) => Course.findById(courseID).populate('owner');

exports.delete = async (userID, courseID) => {

        const deletedCourse = await Course.findByIdAndDelete(courseID);
        await User.findByIdAndUpdate(userID, {$pull: {createdCourses: deletedCourse._id}})
    };

exports.edit = async(courseID, editedData) => {

    await Course.findByIdAndUpdate(courseID, editedData)
}