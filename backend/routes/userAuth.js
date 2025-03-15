const jwt = require("jsonwebtoken");

const authentication = (req, res, next) =>{

    // Extracting the Token from the Request Header:
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Checking if the Token Exists:
    if(token == null){
        return res.status(401).json({message: "Authentication token required"});
    }

    // Verifying the Token Using jwt.verify():
    jwt.verify(token, "secret123", (err, user)=>{
        if(err){
            return res.status(403).json({message: "Token expired. Please signIn again."})
        }
        req.user = user;
        next();
    })
}

module.exports = authentication