const jwt = require("jsonwebtoken");
const authconfig = require("../config/auth");


module.exports = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader)
        return res.status(401).send({error: "No Token Provided"});


    jwt.verify(authHeader, authconfig.secret, (error, decoded) => {
        console.log(error)
        if (error) return res.status(401).send({ error: "Token invalid"})
        
        return next();
    });
    
}