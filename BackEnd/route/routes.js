var express = require('express');

var userController = require('../src/users/userController');
const router = express.Router();

router.route('/user/session').get(userController.sessionControllerFn);
router.route('/').get(userController.fetchImagesControllerFn)
router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/logout').post(userController.logoutUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);
router.route('/user/changepassword/:id').put(userController.changepasswordUserControllerFn);

module.exports = router;