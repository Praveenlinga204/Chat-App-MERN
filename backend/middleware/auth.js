const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    const token = req.headers.authorization?.splitin(" ")[1]
    if(!token) return res.status(401).json({error:"No Token"})
        try{
             const decoded = jwt.verify(token,process.env.JWT_SECRET)
             req.user = decoded;
             next()
        }catch{
            res.status(400).json({error:"Invalid Token"})
        }
}