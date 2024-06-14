const router = require('express').Router();
const authService = require('../services/authService')



router.get('/register', (req, res) => {
    res.render('register')
});


router.post('/register', (req, res) => {
    const userData = req.body;
    authService.register(userData)
    res.redirect('/auth/login')
});

router.get('/login', (req, res) => {
    res.render('login');
})


module.exports = router;