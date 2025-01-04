import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/EVStation');

const db= mongoose.connection; 

db.on('open', ()=>
    {
        console.log("db is connected successfully");
    })

db.on('error', ()=>
    {
        console.log("error in connecting db");
    })

 export default db;   