import dotenv from "dotenv";

dotenv.config({
    path:"./.env",
});

let myusername=process.env.username1;

console.log(myusername);
console.log("Backend Started");
