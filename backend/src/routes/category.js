const express = require('express');
const router = express.Router();

const {
    create
} = require('../controllers/category')

const {
    requireSingin,
    isAuth,
    isAdmin
} =  require('../controllers/auth')

const { userById } = require('../controllers/user')

router.post('/category/create/:userId',
    requireSingin,
    isAuth,
    isAdmin,
    create);

router.param('userId', userById)

module.exports = router;