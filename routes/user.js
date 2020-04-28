const express = require('express');
const router = express.Router();

const { singup } = require('../Controllers/user')
const { userSignupValidator } = require('../validator')

router.post("/singup", userSignupValidator, singup);

module.exports = router;