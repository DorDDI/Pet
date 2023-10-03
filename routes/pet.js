const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.route('/')
    .post(petController.NewPet)
    .get((req, res) => {
        const data = {
            pageTitle: 'Create Pet',
            current_user: global.current_user
        };
        res.render('Pet_new',data);
    })
    .delete(petController.deletePet);

router.route('/:owner/:petname')
    .get(petController.getOnePet);

module.exports = router;