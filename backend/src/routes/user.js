const express = require('express');
const router = express.Router();

const { requireSingin, isAuth, isAdmin} = require('../controllers/auth')

const { userById, read, update } = require('../controllers/user')

router.get('/secret/:userId', requireSingin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

router.get('/user/:userId', requireSingin, isAuth, read)
router.put('/user/:userId', requireSingin, isAuth, update)

router.param('userId', userById)

module.exports = router;