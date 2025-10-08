import dotenv from "dotenv";
import app from './app.js';
import connectDB from "./db/index.js";
dotenv.config({
    path:"./.env",
});



const port=process.env.PORT || 3000;

connectDB()
  .then(()=>{
  app
  .listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.log(`server error ${err}`);
  });
  })
  .catch((err)=>{
    console.log("Error",err);
    process.exit(1);
  })