const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/',);
router.get('/', (req, res) => {
    const data = {
        pageTitle: 'Pet main menu',
        current_user: global.current_user
    };
    res.render('Pet_menu',data);
});

module.exports = router;