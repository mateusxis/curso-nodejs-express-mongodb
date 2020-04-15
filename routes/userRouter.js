const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.show);

router.post('/', UserController.create);

router.get('/:id', UserController.index);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.delete);

module.exports = router;
