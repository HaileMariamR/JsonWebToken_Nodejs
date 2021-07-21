import Jwt  from "jsonwebtoken";

const VerifyCurrentToken = (req, res, next)=>{

        const token = req.body.token ||req.headers["x-access-token"];

        if(!(token)){
            return res.status(403).send("A token is required for authentication");
        }

}

