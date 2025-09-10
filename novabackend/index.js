import connectDB from "./db.js";
import { app } from "./app.js";
import dotenv from "dotenv"


dotenv.config({
    path:'./env'
})
 connectDB()

.then(()=>{
     app.listen(5001,()=>{
        console.log(`server listening at port: ${5001}`)
     })
})
.catch((err)=>{
    console.log("mongodb connection failed",err)
})