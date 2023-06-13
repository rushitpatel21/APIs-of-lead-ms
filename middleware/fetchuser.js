const JWT = require('jsonwebtoken');
const JWT_SECRET = "Ru$#!T-Le@D";

const fetchuser = (req,res,next) => {
    const token = req.header('token');
    if (!token) {
        res.status(400).send({
            error: 'Please authenticate using valid token'
        });
    }
    try {
        const getId = JWT.verify(token,JWT_SECRET);
        req.userId = getId.user;
        next();
    } catch (error) {
        res.status(400).send(`Internal server error => ${error}`)
    }
}

module.exports = fetchuser;