const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const cors = require('cors');
const corsConf = require('./config/corsConf');
const mongoose = require('mongoose');
const DBconnect = require('./config/DBConnect');
const cookieParser = require('cookie-parser');

//functions
const { logger } = require('./functions/eventLogger');
const errorHandler = require('./functions/errorLogger');
const verifyJWT = require('./functions/JWTVerification');
const credentials = require('./functions/credentialsHendler');

const PORT = process.env.PORT || 5500;


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
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/home', require('./routes/mainPage'));
app.get('/index', (req,res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'index.html'));
})
app.use('/', require('./routes/mainPage'));


// check the user is login:
app.use(verifyJWT);
app.use('/users', require('./routes/user'));



// 404 return in default 
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'HTML', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


// error logger
app.use(errorHandler);

//run the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});