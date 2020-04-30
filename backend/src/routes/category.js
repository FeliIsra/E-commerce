const express = require('express');
const router = express.Router();

const { create, categoryById, read, remove, update } = require('../controllers/category')
const {requireSingin, isAuth, isAdmin } =  require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSingin, isAuth, isAdmin, create)
router.delete('/category/:categoryId/:userId', requireSingin, isAuth, isAdmin, remove)
router.put('/category/:categoryId/:userId', requireSingin, isAuth, isAdmin, update)

router.param('categoryId', categoryById)
router.param('userId', userById)

module.exports = router;