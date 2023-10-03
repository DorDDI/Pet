const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    const currect_user = global.current_user;
    if ( currect_user != null)
    {
        res.redirect('/Pet_menu');
    }
    else
    {
        const data = {
            pageTitle: 'Pet welcome',
            current_user: global.current_user
        };
        res.render('menu',data);
    }

});

module.exports = router;