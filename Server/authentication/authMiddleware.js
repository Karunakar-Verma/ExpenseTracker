import jwt from "jsonwebtoken"


 const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(400).json({message:"Token not found."});
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_CODE);
        req.user = decoded;
        next(); 
    }
    catch(error){
        res.status(401).json({ message: "Invalid token!" });
    }
}

export default verifyToken;