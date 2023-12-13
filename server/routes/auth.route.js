const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/signin', authController.signin);
router.get('/isauth', auth(), authController.isauth);
router.post('/testrole', auth('createAny', 'test'), authController.testrole); 
// what we want to do aur what is the resource.


module.exports = router;
