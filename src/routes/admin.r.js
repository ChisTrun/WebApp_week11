const express = require('express');
const adminController = require('../controllers/admin.c')
const {Permission} = require('../Middlewares/permission');
const authGuard  = require('../Middlewares/authGuard');
const authorization = require('../Middlewares/authorization')
const router = express.Router();

router.use(authGuard);
router.use(authorization);
router.use(Permission([1]))
router.get('/',adminController.getAdmin);

module.exports = router;