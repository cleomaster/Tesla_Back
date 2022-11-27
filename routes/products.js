const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router.get('/', async (req, res) => {
    const products = await Products.findAll();
    res.send(JSON.stringify(products));
})

module.exports = router;