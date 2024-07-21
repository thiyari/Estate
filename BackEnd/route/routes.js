var express = require('express');

var userController = require('../src/users/userController');
const router = express.Router();


router.route('/').get(userController.fetchImagesControllerFn)
router.route('/api/session').get(userController.sessionControllerFn);
router.route('/api/users').get(userController.usersControllerFn);
router.route('/api/login').post(userController.loginUserControllerFn);
router.route('/api/logout').post(userController.logoutUserControllerFn);
router.route('/api/create').post(userController.createUserControllerFn);
router.route('/api/changepassword/:id').put(userController.changepasswordUserControllerFn);
router.route('/api/profile/:id').get(userController.profileControllerFn);
router.route('/api/profile/fname/:id').put(userController.profileFnameControllerFn);
router.route('/api/profile/lname/:id').put(userController.profileLnameControllerFn);
router.route('/api/profile/user/:id').put(userController.profileUserControllerFn);
router.route('/api/profile/email/:id').put(userController.profileEmailControllerFn);
router.route('/api/profile/phone/:id').put(userController.profilePhoneControllerFn);
router.route('/api/profile/upload/:id').post(userController.profileUploadImagesControllerFn);
router.route('/api/profile/deleteimage/:id').delete(userController.profileDeleteImageControllerFn);
router.route('/api/profile/propertylocation/:id').put(userController.profilePropertyLocationControllerFn)
router.route('/api/profile/propertyarea/:id').put(userController.profilePropertyAreaControllerFn)
router.route('/api/profile/propertytype/:id').put(userController.profilePropertyTypeControllerFn)
router.route('/api/profile/propertyphase/:id').put(userController.profilePhaseControllerFn)

module.exports = router;