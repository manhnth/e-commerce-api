const express = require('express');
const router = express.Router();
const { authorizeUser, authorizePermissions } = require('../middleware/authorization');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require('../controllers/userController');
const { route } = require('express/lib/router');

router
  .route('/')
  .get(authorizeUser, authorizePermissions('admin'), getAllUsers);
router
  .route('/showCurrentUser')
  .get(authorizedUser, showCurrentUser);
router
  .route('/updateUser')
  .patch(authorizeUser, updateUser);
router
  .route('/updateUserPassword')
  .patch(authorizeUser, updateUserPassword);

router
  .route('/:userId')
  .get(authorizeUser, getSingleUser)


module.exports = router;