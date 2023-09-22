const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    console.log("11");
    const { user, email, pwd } = req.body;
    console.log(req.body);
    if (!user || !email ||!pwd) return res.status(400).json({ 'message': 'Username, email and password are required.' });

    // check for duplicate usernames in the db
    const duplicateuser = await User.findOne({ username: user }).exec();
    if (duplicateuser) return res.sendStatus(409); //Conflict 
    const duplicateemail = await User.findOne({ email: email }).exec();
    if (duplicateemail) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };