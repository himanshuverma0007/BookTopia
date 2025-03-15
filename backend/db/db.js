const mongoose = require("mongoose");
const MONGO_URI = process.env.URI

const db = async()=>{
    try{

        // provide url here 
        await mongoose.connect(MONGO_URI);
        console.log("mongodb connected");
    }
    catch(error){
        console.log("error occured " + error);
    }
}

db();