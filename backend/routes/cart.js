const express = require("express");
const router = express.Router();
// const bookModel = require("../models/bookModel");
const authenticateToken = require("./userAuth");
const userModel = require("../models/userModel");

// to add book to Cart
router.put("/add-book-to-cart", authenticateToken, async(req, res)=>{
    
    try{
        const {bookid, id} = req.headers;
        
        const userData = await userModel.findOne({_id: id});
        const isBookInCart = userData.cart.includes(bookid);   

        if(isBookInCart){
            return res.status(200).json({message: "Book is already in cart"});
        }
        // us user ko dhoondo and usme cart wale object mai book ki id daal do 
        await userModel.findOneAndUpdate({_id: id},{ $push: {cart: bookid}}); 
        return res.status(200).json({status: "Success", message: "Added to Cart"});

    }
    catch(err){
        return res.status(500).json({message: "An Error Occured"});
    }
})

// to remove book from cart 
router.put("/remove-book-from-cart/:bookid", authenticateToken, async(req, res)=>{
    
    try{
        const {id} = req.headers;
        const {bookid} = req.params;
        
        const userData = await userModel.findOne({_id: id});
        const isBookInCart = userData.cart.includes(bookid);

        if(isBookInCart){
            await userModel.findOneAndUpdate({_id: id},{ $pull: {cart: bookid}}); 
        }
        
        return res.status(200).json({message: "removed from cart"});
    }
    catch(err){
        return res.status(500).json({message: "An Error Occured"});
    }
})

// get all the books from cart 
router.get("/get-user-cart", authenticateToken, async(req, res)=>{
    
    try{
        const {id} = req.headers;
        
        const userData = await userModel.findOne({_id: id}).populate("cart");
        const cartData = userData.cart;
        
        return res.json({status: "success", data: cartData})
    }
    catch(err){
        return res.status(500).json({message: "An Error Occured"});
    }
})

module.exports = router;