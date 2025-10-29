import express from "express";
import cors from "cors";
import healthCheckRoute from "./routes/healthcheck.route.js";
import authRouter from "./routes/auth.route.js"
const app=express();

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true, limit:"16kb"}));

app.use(express.static("public"));


//cors configurations
app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Authorization","Content-Type"],
}),
);


app.use("/api/v1/healthcheck",healthCheckRoute);
app.use("/api/v1/auth", authRouter);
app.get('/',(req,res)=>{
    res.send("Welcome to APP");
})


export default app;