var express = require('express');

var userController = require('../src/users/userController');
const router = express.Router();


router.route('/api').get(userController.fetchProfilesControllerFn);
router.route('/api/approvals').get(userController.fetchProfilesApprovalsControllerFn);
router.route('/api/plots').get(userController.fetchProfilesPlotsControllerFn)
router.route('/api/houses').get(userController.fetchProfilesHousesControllerFn)
router.route('/api/commercial').get(userController.fetchProfilesCommercialControllerFn)
router.route('/api/session').get(userController.sessionControllerFn);
router.route('/api/users').get(userController.usersControllerFn);
router.route('/api/contacts').get(userController.contactsUserControllerFn);
router.route('/api/login').post(userController.loginUserControllerFn);
router.route('/api/logout').post(userController.logoutUserControllerFn);
router.route('/api/create').post(userController.createUserControllerFn);
router.route('/api/contacts/create').post(userController.createContactsControllerFn);
router.route('/api/admin/profiles').get(userController.adminProfilesControllerFn);
router.route('/api/:propertyid').get(userController.fetchProfilesPropertyidControllerFn);
router.route('/api/approvals/:id').put(userController.ApprovalSanctionControllerFn);
router.route('/api/admin/:key').get(userController.adminKeyControllerFn)
router.route('/api/changepassword/:id').put(userController.changepasswordUserControllerFn);
router.route('/api/profile/:id').get(userController.profileControllerFn);
router.route('/api/profile/fname/:id').put(userController.profileFnameControllerFn);
router.route('/api/profile/lname/:id').put(userController.profileLnameControllerFn);
router.route('/api/profile/user/:id').put(userController.profileUserControllerFn);
router.route('/api/profile/email/:id').put(userController.profileEmailControllerFn);
router.route('/api/profile/phone/:id').put(userController.profilePhoneControllerFn);
router.route('/api/profile/upload/:id').post(userController.profileUploadImagesControllerFn);
router.route('/api/profile/deleteimage/:id').delete(userController.profileDeleteImageControllerFn);
router.route('/api/profile/delete/:id').delete(userController.profileDeleteControllerFn);
router.route('/api/profile/propertylocation/:id').put(userController.profilePropertyLocationControllerFn)
router.route('/api/profile/propertyarea/:id').put(userController.profilePropertyAreaControllerFn)
router.route('/api/profile/propertytype/:id').put(userController.profilePropertyTypeControllerFn)
router.route('/api/profile/propertyphase/:id').put(userController.profilePhaseControllerFn)
router.route('/api/profile/rooms/:id').put(userController.profileRoomsControllerFn)
router.route('/api/profile/floor/:id').put(userController.profileFloorControllerFn)
router.route('/api/profile/currency/:id').put(userController.profileCurrencyControllerFn)
router.route('/api/profile/zip/:id').put(userController.profileZipControllerFn)
router.route('/api/profile/propertyaddress/:id').put(userController.profilePropertyAddressControllerFn)


module.exports = router;