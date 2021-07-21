import bcrypt from 'bcryptjs'
import  User  from "../model/user.js";
import jwt from 'jsonwebtoken';


export const allroutes =  (app)=>{

    app.post("/register", async (req, res) => {

        try {
    
          const first_name = req.body.first_name;
          const last_name = req.body.last_name;
          const email = req.body.email;
          const password = req.body.password;
     
          if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
          }
      
          const check_user = await User.findOne({ email });
      
          if (check_user) {
            return res.status(409).send("User Already Exist.");
          }
      
        
        const  encryptedPassword = await bcrypt.hash(password, 10);
      
          
          const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
          });
      
      
          const token = jwt.sign(
            { user_id: user._id, email },
            "my_secret",
            {
              expiresIn: "2h",
            }
          );
      
          user.token = token;
      
       
          res.status(201).json(user);


        } catch (error_occured) {
          console.log(error_occured);
        }
   
      });
    app.post('/login' , (req, res)=>{

        try{
            const {email , password} = req.body;

            if (!(email && password)) {
                res.status(400).send("All input is required");
              }
            

            const currentUser = User.findOne({email});
            if (currentUser && bcrypt.compare(password , currentUser.password)){

                const Generate_Token = jwt.sign(
                    {user_id:currentUser._id , email}, 
                    "my_secret", 
                    {
                        expiresIn:"2h"
                    }
                );

                currentUser.token = Generate_Token;
            
                res.send(`logged in succesfully ${Generate_Token}`)

            }

            res.send(400).send("Invalid Credentials");

        }catch(error_occured){
            console.log(error_occured);
        }

    });

    app.get('/mainroute' , (req, res)=>{
        res.send("route working!")
    });

}

