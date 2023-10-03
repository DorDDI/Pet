const User = require('../models/User');

const handleLogout = async (req, res) => {

    global.current_user = null;
    
    /*

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    */
   
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;

        // Is refreshToken in db?
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

    // Delete refreshToken in db

    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    //res.sendStatus(204);
    console.log('12');
    res.redirect('/home');
    
}

module.exports = { handleLogout }