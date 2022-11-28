const express = require('express');
const router = express.Router();
const Products = require('../models/Products');



router.get("/", async (req, res) => {
    let products = await Products.findAll();
    res.send(products);
})

module.exports = router;