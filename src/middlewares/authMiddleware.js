const jwt = require('../lib/jsonwebtoken');
const {SECRET} = require('../config');




exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies['auth'];

    if(!token) {

        return next() //THIS IS THE CASE WHERE WE JOIN AS GUEST AND DONT LOGIN OR REGISTER
    }
    try {
        const decodedToken = await jwt.verify(token, SECRET); //TOVA E USER INFORMACIQTA KOQTO ZAKODIRAHME V TOKENA
        req.user = decodedToken; //OT TUK CHREZ REQ SHTE MOJEM DA DOSTUPVAME INFIRMACIQ ZA USERA FOR EXAMPLE: req.user._id ili req.user.email
        res.locals.isAuthenticated = true; //TOVA E ZA NAVIGACIQTA kakwo da se pokazva i kako ne v zaviismost dali si lognat s token
        res.locals.user = decodedToken; //GLOBALNO ZA HANDLEBARS

        next()

    } catch(err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
    
};

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/auth/login') //tova e za lognati potrebiteli
    }
    next()
};



exports.isGuest = (req, res, next) => { //tova e proverka za nelognati potrebiteli (naprimer pri register ili login nie vse oshte sme guest taka che tam pravim tazi proverka, nqma logika da sme lognati)
    if(req.user) {
        return res.redirect('/')
    }
    next()
};

