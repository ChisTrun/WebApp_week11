const express = require('express');
const categoriesController = require('../controllers/categories.c');
const productController = require('../controllers/product.c');
const orderController = require('../controllers/order.c');
const authorization = require('../Middlewares/authorization');
const fs = require('fs');
const multer = require('multer');
const removeTempImage = require('../Middlewares/removeTempImage');
const path = require('path');
const router = express.Router();
const authGuard = require('../Middlewares/authGuard');
const ConfigMulter = require('../configs/ConfigMulter');

// config multer
const upload = ConfigMulter(path.join(path.dirname(__dirname), 'public/temp'));
const createImageFolder = require('../Middlewares/createImageFolder')



router.use(authGuard);

//Authorization
router.use(authorization);


//pro
router.get('/product', productController.getAll);
router.get('/product/ProID=:ProID', productController.getByProID)
router.get('/product/per_page=:per_page/page=:page', productController.getAllPaging);
router.get('/product/per_page=:per_page/page=:page/CatID=:CatID', productController.getByCatID);
router.post('/product/remove', productController.removeProduct);
router.post('/product/add',upload.single('image'),productController.addProduct,createImageFolder,removeTempImage);
router.post('/product/update', productController.updateProduct);
//cat
router.get('/categories', categoriesController.getAll);
router.get('/categories/CatID=:CatID', categoriesController.getByCatID);
router.post('/categories/remove', categoriesController.removeCat);
router.post('/categories/add', categoriesController.addCat);
router.post('/categories/update', categoriesController.updateCat);
//order
router.get('/order', orderController.getAll);
router.get('/order/detail/OrderID=:OrderID', orderController.detail);

module.exports = router;