const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [5, 'Title should be at least 5 characters long']
  },
   type: {
         type: String,
         required: [true, 'Type is required'],
         minlength: [3, 'Type should be at least 3 characters long']
   },
   certificate: {
         type: String,
         required: [true, 'Certificate is required'],
         minlength: [2, 'Certificate should be at least 2 characters long']
   },
   image: {
         type: String,
         required: [true, 'Image is required'],
         validate: {
            validator: function(v) {
               return /^https?:\/\//.test(v);
            },
            message: props => `${props.value} is not a valid image URL. Must start with http:// or https://`
         }
   },
   description: {
         type: String,
         required: [true, 'Description is required'],
         minlength: [10, 'Description should be at least 10 characters long']
   },
   price: {
         type: Number,
         required: [true, 'Price is required'],
         min: [0, 'Price should be a positive number']
   },
   signUpList: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
   }],
   owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
   },


});



const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
