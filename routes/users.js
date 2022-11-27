const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.post('/register', async (req, res) => {
    await Users.create({ name: "Adil", password: "12345678", email: "adil@gmail.com" })
    res.send("User successfully registered");
})

module.exports = router;