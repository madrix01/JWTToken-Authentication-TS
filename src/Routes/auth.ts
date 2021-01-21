import {Router} from 'express';
const router = Router();
const User = require('../Models/User');
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface NewUser {
    email : string;
    username : string;
    password : string;
    _id : string;
}

interface LoginUser{
    username : string;
    password : string;
}

//Register User

router.get('/register', async (req, res) => {
    res.send('{"page" : "login"}');
})

router.post('/register', async (req, res) => {
    const body : NewUser = req.body;
    console.log(body);

    //Checking for Duplicate
    const userNameExsist : Boolean = await User.findOne({username : body.username});
    const emailExsist : Boolean = await User.findOne({email : body.email});

    if(userNameExsist || emailExsist) return res.status(400).send("Email or username taken");

    // Encrypting Password
    const salt : string  = await bcrypt.genSalt(10);
    const hashPassword : string = await bcrypt.hash(body.password, salt);

    const user = new User({
        username : body.username,
        email : body.email,
        password : hashPassword
    })

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
})

// Login user
router.get('/login', async (req, res) => {
    res.send('{"page" : "login"}');
})

router.post('/login', async (req, res) => {
    const body : LoginUser = req.body;

    // Check username
    const userExist: NewUser = await User.findOne({username : body.username});
    console.log(userExist);
    if(!userExist) return res.status(400).json({"error" : "Username or password incorrect"});
    
    // Check Password
    const validPassword : boolean = await bcrypt.compare(body.password, userExist.password);
    if(!validPassword) return res.status(400).json({"error" : "Username or password incorrect"});

    // expires token after 1 day

    const token = jwt.sign({
        user_id : userExist._id,
        username : userExist.username
    }, process.env.TOKEN_SECRET, {expiresIn : '1d'});

    res.header('auth-token', token).json({'auth-token' : token});
    console.log("Successfully loggedIn");    
})


module.exports = router;