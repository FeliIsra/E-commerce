const express = require('express');
const router = express.Router();

const { singup } = require('../Controllers/user')

router.post("/singup", singup);

module.exports = router;