const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.post('/register', async (req, res) => {
    await Users.create({ name: req.body.name, password: req.body.password, email: req.body.email });
    res.sendStatus(200);
})

module.exports = router;