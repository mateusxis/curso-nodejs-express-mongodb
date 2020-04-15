const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/', AuthController.auth);

module.exports = router;
