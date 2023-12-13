const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user.controller');
// authentification middleware.

router.route('/profile')
.get(auth('readOwn', 'profile'), userController.profile)
.patch(auth('updateOwn', 'profile'), userController.updateProfile )


router.patch('/email', auth(), userController.updateEmail);

router.get('/verify', userController.verifyEmail)

module.exports = router;
