const adminAuth= (req,res,next)=>{
    const token ="xyz";
    const isAdminAuthorised= (token==="xyz");
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Request");
    }
    else{
        console.log("admin Auth");
        next();
    }}

const userAuth= (req,res,next)=>{
        const token ="xyz";
        const isAdminAuthorised= (token==="xyz");
        if(!isAdminAuthorised){
            res.status(401).send("Unauthorised Request");
        }
        else{
            console.log("User Auth");
            next();
        }}
module.exports={
    adminAuth, userAuth
}