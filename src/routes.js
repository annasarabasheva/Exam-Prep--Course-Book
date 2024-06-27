const routes = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');



routes.use(homeController);
routes.use('/auth', authController);
routes.use('/courses', courseController);


module.exports = routes;