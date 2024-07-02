var express = require('express');

var userController = require('../src/users/userController');
const router = express.Router();

router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);
//router.route('/user/upload').post(userController.uploadImageControllerFn);
module.exports = router;