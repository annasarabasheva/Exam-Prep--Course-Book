const router = require('express').Router();
const {isAuth} = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const {getErrorMessage} = require('../utils/errorUtils')



router.get('/catalog', async (req, res) => {
    const courses = await courseService.getAll().lean(); //NE ZABRAVQI LEANNNNNNN MN VAJNO
    res.render('catalog', {courses})
});

router.get('/catalog/:courseID/details', async (req, res) => {
    const course = await courseService.getOne(req.params.courseID).lean(); //NE ZABRAVQI LEANNN
    const userID = req.user ? req.user._id : null;
    const isOwner = course.owner._id == req.user?._id
    res.render('details', {...course, isOwner, userID});
}); 

router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;
    try {
        await courseService.create(req.user._id, courseData)
        res.redirect('/courses/catalog')
    }catch(err) {
        res.render('create', {...courseData, error: getErrorMessage(err)});
    }

});


router.get('/catalog/:courseID/delete', async(req, res) => {
    await courseService.delete(req.params.courseID).lean();
    res.redirect('/courses/catalog')

    
   
});

router.get('/catalog/:courseID/edit', async(req, res) => {
    const course = await courseService.getOne(req.params.courseID).lean()
    res.render('edit', {course})
   
});



module.exports = router;