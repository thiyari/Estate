var express = require('express');

var userController = require('../src/users/userController');
const router = express.Router();

router.route('/api/session').get(userController.sessionControllerFn);
router.route('/api/users').get(userController.usersControllerFn);
router.route('/').get(userController.fetchImagesControllerFn)
router.route('/api/login').post(userController.loginUserControllerFn);
router.route('/api/logout').post(userController.logoutUserControllerFn);
router.route('/api/create').post(userController.createUserControllerFn);
router.route('/api/changepassword/:id').put(userController.changepasswordUserControllerFn);

module.exports = router;