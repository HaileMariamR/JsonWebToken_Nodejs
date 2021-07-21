import mongoose from 'mongoose';
const url = "mongodb://localhost:12345/jwt";
 const connectDatabase = ()=>{

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
    .then(()=>{
        console.log("Database connected succesfully!");
    })
    .catch((error)=>{
        console.log("Sorry! the Database connection Failed");
    })
}
export default connectDatabase