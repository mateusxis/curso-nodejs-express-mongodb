const express = require('express');
const UserController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, UserController.show);

router.post('/', UserController.create);

router.get('/:id', auth, UserController.index);

router.put('/:id', auth, UserController.update);

router.delete('/:id', auth, UserController.delete);

module.exports = router;
