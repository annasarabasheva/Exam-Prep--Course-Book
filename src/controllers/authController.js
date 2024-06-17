const router = require('express').Router();
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');
const {isGuest, isAuth} = require('../middlewares/authMiddleware')




router.get('/register', isGuest, (req, res) => {
    res.render('register')
});


router.post('/register', isGuest, async (req, res) => {
    const userData = req.body;
    try{
        const token =  await authService.register(userData);
        res.cookie('auth', token)
        res.redirect('/');
    } catch(err) {
        res.render('register', {...userData, error: getErrorMessage(err)});
    }
    
    
});

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const loginData = req.body;
    try {
        const token = await authService.login(loginData);
        res.cookie('auth', token);
        res.redirect('/');
    } catch(err) {
        res.render('login', {...loginData, error: getErrorMessage(err)}); //Davame i logindatata zashtoto informaciqta pri greshka trqbva da ostane vuvedena v poletata

    }
    
    
});


router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})


router.get('/profile', (req, res) => {
    res.render('profile')
});

module.exports = router;