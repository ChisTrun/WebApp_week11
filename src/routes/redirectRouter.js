const express = require('express');
const siteController = require('../controllers/site.c')
const router = express.Router();

router.get('/', siteController.redirectPage);
module.exports = router;