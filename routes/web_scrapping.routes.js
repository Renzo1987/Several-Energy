const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/selenium.py');

router.post('/user/login', user_controller.handleLogin);

module.exports = router