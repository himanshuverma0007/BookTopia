const express = require("express");
const router = express.Router();
const authenticateToken = require("./userAuth");
const userModel = require("../models/userModel")
const orderModel = require("../models/orderModel");
const { populate } = require("dotenv");

// order placing (place order)
router.post("/place-order", authenticateToken, async(req, res)=>{

    try{
        const {id} = req.headers;
        const {order} = req.body;
        
        for(const orderData of order){
        
            const newOrder = await orderModel.create({
            user: id,
            book: orderData._id
            })
            // saving order in userModel 
            await userModel.findOneAndUpdate({_id: id}, {$push: {orders: newOrder._id}})
            
            // clearing cart in userCart 
            await userModel.findOneAndUpdate({_id: id}, {$pull: {cart: orderData._id}})
        }
    
        return res.status(200).json({status: "Success", message: "Order Placed Successfull"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "An error Occured"});
    }

})

// all books ordered by user (get ordered history of user)
router.get("/get-order-history", authenticateToken, async(req, res)=>{
    
    try{
        const {id} = req.headers;
        const userData = await userModel.findOne({_id: id}).populate({
            path: "orders",
            populate: {path: "book"}
        })

        // to make the recent orders at the top 
        const orderData = await userData.orders.reverse();
        
        return res.json({status: "Success", data: orderData});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

// all books ordered by all user (get order history of all user)
router.get("/get-all-orders", authenticateToken, async(req, res)=>{

    try{
        const userData = await orderModel.find()
        .populate({
            path: "book"
        })
        .populate({
            path: "user"
        })
        .sort({createdAt: -1});

        return res.json({status: "Success", data: userData});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
})

// order update status ---> only by admin 
router.put("/update-status/:id", authenticateToken, async(req, res)=>{

    try{
        const {id} = req.params;
        // we can also check ki apna user admin hi hai ya koi or 
        // const user = await userModel.findOne({_id: id})
        // if(user.role !== "admin"){
        //     await orderModel.findOneAndUpdate({_id: id}, {status: req.body.status});
        // }
        
        await orderModel.findOneAndUpdate({_id: id}, {status: req.body.status});
        return res.json({status: "Success", message: "Status Updated Successfully"});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }

})

module.exports = router;