const jwt = require("jsonwebtoken");

const authMiddleware = async(req,res,next) =>{
    let token = req.headers.authorization // getting bearer token
    
    if(!token || token.split(" ")[0] != "Bearer"){
        res.status(401).json({
            message: "Unauthorized Access"
        })
        return;
    }
    token = token.split(" ")[1];
    token = jwt.verify(token,"ABCD@123");
    req.user = token.username;
    req.role = token.role;
    next();
}

module.exports = {
    authMiddleware
}