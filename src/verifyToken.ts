import * as jwt from 'jsonwebtoken';


module.exports = function(req, res, next){

    const token : string = req.header('auth-token');
    if(!token) return res.status(400).json({"error" : "Access Denied"});

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).json({"error" : "invalid token"})
    }
}