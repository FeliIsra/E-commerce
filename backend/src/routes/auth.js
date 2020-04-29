const express = require('express');
const router = express.Router();

const {
    singup,
    singin,
    singout,
    requireSingin
} = require('../controllers/auth')
const { userSignupValidator } = require('../validator')

router.post("/singup", userSignupValidator, singup);
router.post("/singin", singin);
router.get("/singout", singout);

module.exports = router;