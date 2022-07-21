const express = require('express');
const router = express.Router();
const { authorizeUser, authorizePermissions } = require('../middleware/authorization');

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
  .post(authorizeUser, authorizePermissions('admin'), createProduct)
router
  .route('/uploadProductImg')
  .post(authorizeUser, authorizePermissions('admin'), uploadProductImg)
router
  .route('/:productID')
  .get(getSingleProduct)
  .patch(authorizeUser, authorizePermissions('admin'), updateProduct)
  .delete(authorizeUser, authorizePermissions('admin'), deleteProduct)

module.exports = router;