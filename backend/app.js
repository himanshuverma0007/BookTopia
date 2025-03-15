const express = require("express");
const app = express();
const cors = require("cors");

// initializing env file 
require('dotenv').config();
// db connection 
const db = require("./db/db")

// user route
const user = require("./routes/user");
// book route
const book = require("./routes/book");
// favourite route 
const favourites = require("./routes/favourites")
// cart route 
const cart = require("./routes/cart")
// order route
const order = require("./routes/order")

// port number 
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("Hello world")
})

// creating routes 
app.use("/app/v1", user);
app.use("/app/v1", book);
app.use("/app/v1", favourites);
app.use("/app/v1", cart);
app.use("/app/v1", order);


app.listen(PORT, ()=>{
    console.log("server started at " + PORT);  
})