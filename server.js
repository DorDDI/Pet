const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const cors = require('cors');
const corsConf = require('./config/corsConf');
const mongoose = require('mongoose');
const DBconnect = require('./config/DBConnect');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');





// Connect to MongoDB
DBconnect();


// Cross Origin Resource Sharing
app.use(cors());


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});