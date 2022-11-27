const express = require('express');
const router = express.Router();
const Carts = require('../models/Carts');

router.get('/carts', async (req, res) => {
    res.send("Carts page");
})

module.exports = router;