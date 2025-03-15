const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");


// Sign up or authentication whatever
router.post("/sign-up", async(req, res)=>{

    try{
        const {username, email, password, address} = req.body;

        // check username length is more than three(3) 
        if(username.length < 4){
            return res.status(400).json({message: "username length should be greater than 3"})
        }

        // check username already exists 
        const existingUser = await userModel.findOne({username: username});
        if(existingUser){
            return res.status(400).json({message: "user already exists"});
        }

        // check existingEmail already exists 
        const existingEmail = await userModel.findOne({email: email});
        if(existingEmail){
            return res.status(400).json({message: "email already exists"});
        }

        // check passwords length 
        if(password.length <= 5){
            return res.status(400).json({message: "Password length should be greater than 5"})
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashPass,
            address: address
        })

        return res.status(200).json({message: "user created successfully"});

    }
    catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
})

// Sign in 
router.post("/sign-in", async(req, res)=>{

    try{
        const {username, password } = req.body;

        const existingUser = await userModel.findOne({username});

        if(!existingUser){    
            return res.status(400).json({message: "Invalid credentials"});
        }
        
// compare lega do values (password jo hum frontend se lenge, password jo database mai hai, agr dono same honge toh data = true else false )
        await bcrypt.compare(password, existingUser.password, (err, data)=>{
            if(data){   
            // agr humaare pass data aa jaata hai means hum logged in hai ab hum bs token bhej denge or usko token bnane ke liye usme kya kya hoga like name, and role kya hai jo bnda login hua hai 
                
                const authClaims = [{name: existingUser.username},{role: existingUser.role}];

                const token = jwt.sign({authClaims}, "secret123", {expiresIn: "30d"});

                // so hum message nhi bhenjenge ki user signin hogya rather hum useme user ki id, uska role and ek token bhejenge 
                console.log("logged in successfully");
                console.log("Chal gaya");
                return res.status(200).json({id: existingUser._id, role: existingUser.role, token: token});
            }
            else{
                return res.status(400).json({message: "Invalid credentials"});
            }
        })
        
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
})

// get-user-information
router.get("/get-user-information", authenticateToken , async (req, res)=>{

    try {
        const {id} = req.headers;  // .select('-password') means that we are excluding password from user information which is data 
        const data = await userModel.findById(id).select('-password');
        return res.status(200).json(data);
    } 
    catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
})

// update address 
router.put("/update-address", authenticateToken ,async(req, res)=>{

    try{
        const {id} = req.headers;
        const {address} = req.body;

        // const data = await userModel.findByIdAndUpdate(id, {address});
        const data = await userModel.findOneAndUpdate({_id: id}, {address}, {new: true});

        console.log(data);
        return res.status(200).json({message: "Address Successfully Updated"});
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;