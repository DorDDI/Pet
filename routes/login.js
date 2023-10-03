const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const path = require('path');

router.post('/', loginController.handleLogin);

router.get('/', (req, res) => {
    const data = {
        pageTitle: 'Login menu',
        current_user: global.current_user
    };
    res.render('login',data);
});

module.exports = router;