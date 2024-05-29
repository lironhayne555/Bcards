var express = require('express');
var router = express.Router();
const users = require('../controllers/users');

router.get('/', users.getUsers);
router.post('/signup', users.signup);
router.post('/login', users.login);
router.patch('/:_id', users.edit);
router.delete('/:_id', users.delete);
module.exports = router;