const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    const data = {
        pageTitle: 'Pet welcome',
        current_user: global.current_user
    };
    res.render('menu',data);
});

module.exports = router;