const router = require('express').Router();
const {isAuth} = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const {getErrorMessage} = require('../utils/errorUtils')



router.get('/catalog', async (req, res) => {
    const courses = await courseService.getAll().lean(); //NE ZABRAVQI LEANNNNNNN MN VAJNO
    res.render('catalog', {courses})
});

router.get('/catalog/:courseID/details', async (req, res) => {
    const course = await courseService.getOne(req.params.courseID).lean();
    res.render('details', {...course});
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







module.exports = router;