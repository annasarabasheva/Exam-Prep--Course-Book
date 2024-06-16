const router = require('express').Router();
const {isAuth} = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const {getErrorMessage} = require('../utils/errorUtils')



router.get('/catalog', (req, res) => {
    res.render('catalog')
})
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