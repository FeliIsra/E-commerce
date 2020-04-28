const express = require('express');
const router = express.Router();

const { singup, singin, singout } = require('../Controllers/user')
const { userSignupValidator } = require('../validator')

router.post("/singup", userSignupValidator, singup);
router.post("/singin", singin);
router.get("/singout", singout);

module.exports = router;