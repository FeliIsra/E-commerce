const express = require('express');
const router = express.Router();

const {
    singup,
    singin,
    singout,
    requireSingin
} = require('../controllers/auth')
const { userSignupValidator } = require('../validator')

router.post("/signup", userSignupValidator, singup);
router.post("/signin", singin);
router.get("/signout", singout);

module.exports = router;