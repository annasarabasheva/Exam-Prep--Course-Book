const router = require('express').Router();
const {isAuth} = require('../middlewares/authMiddleware')



router.get('/', (req, res) => {
    res.render('home')
});

//THIS IS FOR TESTING TO SEE IF WE ARE AUTHORIZED
router.get('/test', isAuth, (req, res) => {
    res.send('You are authorized')
})
module.exports = router;