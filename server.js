import  connectDatabase  from "./config/database.js";
import { allroutes } from "./routes/allRoutes.js";
import bodyParser from "body-parser";
import { VerifyCurrentToken } from "./middleware/auth.js";


import express from "express";
const app = express();
connectDatabase();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/' , VerifyCurrentToken, (req, res)=>{
    res.send("working!");
});


allroutes(app);

app.listen(3000, ()=>{
    console.log("sever is running at port 3000");
})