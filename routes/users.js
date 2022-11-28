const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Users = require('../models/Users');

router.post('/register', async (req, res) => {
    await Users.create({ name: req.body.name, password: req.body.password, email: req.body.email });
    res.sendStatus(200);
})

router.post("/login", async (req, res) => {
    const { dataValues: user } = await Users.findOne({
        where: {
            email: req.body.email
        }
    }) || {}

    if (!user) return res.send("Invalid username or password")
    const token = jwt.sign({user_id: user.user_id}, 'jwtPrivateKey');
    res.header('x-auth-token', token).send(true);
})

module.exports = router;