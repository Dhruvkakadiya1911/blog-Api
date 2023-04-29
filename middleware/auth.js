const jwt  = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, "A1B10");
        token
        next();
    } catch (error) {
        res.status(401).json({
            message:"auth failed"
    })
}
}