const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {authMiddleware} = require('./middlewares/authMiddleware');

app.use(express.static(path.join(__dirname, 'public'))); //For public folder
app.use(express.urlencoded({extended: false})); //For body parser

app.use(cookieParser());
app.use(authMiddleware);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));



app.use(routes);

mongoose.connect(`mongodb://localhost:27017/course-book`) //For db
    .then(() => {console.log(`DB Connected`)});


app.listen(3000, () => {console.log('Server is listening on port 3000')});
