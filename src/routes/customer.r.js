const express = require('express');
const {Permission} = require('../Middlewares/permission');
const authGuard  = require('../Middlewares/authGuard');
const authorization = require('../Middlewares/authorization');
const customerController = require('../controllers/customer.c');
const router = express.Router();

router.use(authGuard);
router.use(authorization);
router.use(Permission([2]))
router.get('/',customerController.getCustomer);

module.exports = router;