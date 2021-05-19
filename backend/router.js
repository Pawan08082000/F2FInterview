
const express = require('express');

const router = express.Router();

const auth = require('./routes/auth.router')
const product = require('./routes/product.router')
router.use('/auth', auth)
router.use('/product', product)

module.exports = router;