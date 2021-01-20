import { Router } from 'express';
const router = Router();
const User = require('../Models/User');
//const bcrypt = require('@types/bcryptjs');
import * as bcrypt from 'bcryptjs';
router.get('/register', async (req, res) => {
    res.send("Register here bitch...");
});
router.post('/register', async (req, res) => {
    const body = req.body;
    console.log(body);
    //Checking for Duplicate
    const userNameExsist = await User.findOne({ username: body.username });
    const emailExsist = await User.findOne({ email: body.email });
    if (userNameExsist || emailExsist)
        return res.status(400).send("Email or username taken");
    // Encrypting Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    const user = new User({
        username: body.username,
        email: body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;
