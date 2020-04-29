const express = require('express');
const router = express.Router();

const { requireSingin } = require('../controllers/auth')

const { userById } = require('../controllers/user')

router.get('/secret/:userId', requireSingin, (req, res) => {
    res.json({
        user: req.profile
    })
});

router.param('userId', userById)

module.exports = router;