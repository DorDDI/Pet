const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const path = require('path');


router.post('/', registerController.handleNewUser);
router.get('/', (req, res) => {
    const data = {
        pageTitle: 'Register',
        current_user: global.current_user
    };
    res.render('register',data);
});

module.exports = router;