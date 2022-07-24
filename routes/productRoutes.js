const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImg
} = require('../controllers/productController');

router.route('/').get(getAllProducts);
router
  .route('/create')
  .post(authenticateUser, authorizePermissions('admin'), createProduct)
router
  .route('/uploadProductImg')
  .post(authenticateUser, authorizePermissions('admin'), uploadProductImg)
router
  .route('/:productID')
  .get(getSingleProduct)
  .patch(authenticateUser, authorizePermissions('admin'), updateProduct)
  .delete(authenticateUser, authorizePermissions('admin'), deleteProduct)

module.exports = router;