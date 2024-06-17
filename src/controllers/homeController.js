const router = require('express').Router();
const courseService = require('../services/courseService');




router.get('/', async (req, res) => {
    const allCourses = await courseService.getLatest().lean();
    

    res.render('home', {allCourses})
});


module.exports = router;