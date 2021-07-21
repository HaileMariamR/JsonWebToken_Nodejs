import Jwt  from "jsonwebtoken";


export const VerifyCurrentToken = (req, res, next)=>{

        const token = req.body.token||req.query.token ||req.headers["x-access-token"] || req.headers['authorization'];
        if(!(token)){
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const decoded = jwt.verify(token, "my_secret");
            res.user = decoded
          } catch (err) {
            return res.status(401).send("Invalid Token");
          }
        return next();

}

