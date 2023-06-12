const jwt=require('jsonwebtoken');

const authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    if (token) {
        jwt.verify(token,'secrete',(err,decoded)=>{
            if (decoded) {
                req.body.user=decoded.userID;
                next();
            } else {
                res.send({"msg":"Please Login","Error":err.message});
            }
        })
    } else {
        res.send({"msg":"Please Login","Error":err.message});        
    }
}
module.exports={
    authentication
}