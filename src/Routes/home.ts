import { Router } from "express";
const router = Router();
// import * as verify from '../verifyToken';
const verify = require('../verifyToken');


router.get('/home',verify , async (req, res) => {
    console.log(req['user']);
    res.json({
        'page' : 'home',
        'user' : req['user']['username']
    });
})

module.exports = router;