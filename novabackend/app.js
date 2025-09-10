import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js"
// import imageRouter from "./routes/image.routes.js"
// import appointmentRouter from "./routes/appointment.routes.js"

const app=express()

app.use(cors({
   origin: "http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/user",userRouter)

export {app}