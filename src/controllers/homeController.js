const router = require('express').Router();
const courseService = require('../services/courseService');
const userService = require('../services/userService');
const {isAuth} = require('../middlewares/authMiddleware')



router.get('/', async (req, res) => {
    const allCourses = await courseService.getLatest().lean();
    

    res.render('home', {allCourses})
});

router.get('/profile', isAuth, async (req, res) => {
    const user = await userService.getUser(req.user._id).lean();
    const createdCoursesCount = user.createdCourses?.length || 0;
    const signUpCoursesCount = user.signUpCourses?.length || 0;
    res.render('profile', { ...user, createdCoursesCount, signUpCoursesCount});
});



module.exports = router;