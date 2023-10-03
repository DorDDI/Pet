const express = require('express');
require('dotenv').config();
const User = require('./models/User');
const app = express();
const path = require('path');
const cors = require('cors');
const corsConf = require('./config/corsConf');
const mongoose = require('mongoose');
const DBconnect = require('./config/DBConnect');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');

//functions
const { logger } = require('./functions/eventLogger');
const logError = require('./functions/errorHandler');
const verifyJWT = require('./functions/JWTVerification');
const credentials = require('./functions/credentialsHendler');

global.current_user = null;

const PORT = process.env.PORT || 5500;

app.set('view engine', 'ejs');

// Connect to MongoDB
DBconnect();

// start the log function
app.use(logger);


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);


// Cross Origin Resource Sharing
app.use(cors(corsConf));


// built-in functions for urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//function for cookies
app.use(cookieParser());

//using the css files
app.use('/', express.static(path.join(__dirname, '/public')));


// routes
// for login / logout / register / refresh :


app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
//app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/home', require('./routes/mainPage'));
app.get('/index', (req,res) => {
    const data = {
        pageTitle: 'index',
        current_user: global.current_user
    };
    res.render('index',data);
});
app.use('/', require('./routes/mainPage'));


// check the user is login:
//app.use(verifyJWT);
app.use('/users', require('./routes/user'));
app.use('/Pet_menu', require('./routes/pet_menu'));
app.use('/pet', require('./routes/pet'));



// 404 return in default 
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        const data = {
            pageTitle: '404'
        };
        res.render('404',data);
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


// error logger
app.use(logError);

//run the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});