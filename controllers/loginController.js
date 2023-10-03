const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    // the user was found and we check the password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // need to see if we want to use the roles
        //const roles = Object.values(foundUser.roles).filter(Boolean);
       
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username
                    //"roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '40s' } //see if we want more or less
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } //see if we want more or less
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        //console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true, in prodeuction

        // Send authorization roles and access token to user
        //res.json({ accessToken });
        global.current_user = foundUser;
        res.redirect('/home');

    } else {
        
        res.sendStatus(401);
        //res.redirect('/login');
    }

}

module.exports = { handleLogin };