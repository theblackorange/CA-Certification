const jwt=require('jsonwebtoken');

module.exports=(req,res, next)=>
{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,'theblackorange');
        req.userdata=decoded;
        next();
    }
    catch(error)
    {
        res.send("token failure").status(401);
    }
}