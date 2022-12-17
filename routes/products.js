const express = require('express');
const router = express.Router();
const Products = require('../models/Products');



router.get("/", async (req, res) => {
    let products = await Products.findAll();
    res.send(products);
})

router.get("/:id", async (req, res) => {
    const { dataValues: product } = await Products.findOne({
        where: { product_id: req.params.id }
    }) || {}
    res.send(product);
})


module.exports = router;