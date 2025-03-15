const express = require("express");
const router = express.Router();
// const bookModel = require("../models/bookModel");
const authenticateToken = require("./userAuth");
const userModel = require("../models/userModel");

// to add book in the favourites 
router.put("/add-book-to-favourite", authenticateToken, async(req, res)=>{
    
    try{
        const {bookid, id} = req.headers;
        
        const userData = await userModel.findOne({_id: id});
        const isBookFavourite = userData.favourites.includes(bookid);   

        if(isBookFavourite){
            return res.status(200).json({message: "Book is already in favourites"});
        }
        // us user ko dhoondo and usme favourites wale object mai book ki id daal do 
        await userModel.findOneAndUpdate({_id: id},{ $push: {favourites: bookid}}); 
        return res.status(200).json({message: "Added to favourites"});

    }
    catch(err){
        return res.status(500).json({message: "An Error Occured"});
    }
})

// to delete book from favourite 
router.put("/remove-book-from-favourite", authenticateToken, async(req, res)=>{
    
    try{
        const {bookid, id} = req.headers;
        
        const userData = await userModel.findOne({_id: id});
        const isBookFavourite = userData.favourites.includes(bookid);

        if(isBookFavourite){
            await userModel.findOneAndUpdate({_id: id},{ $pull: {favourites: bookid}}); 
        }
        
        return res.status(200).json({message: "removed from favourites"});
    }
    catch(err){
        return res.status(500).json({message: "An Error Occured"});
    }
})

// get favourite books of a particular user 
router.get("/get-favourite-books", authenticateToken, async(req, res)=>{
    
    try{
        const {id} = req.headers;
        
        const userData = await userModel.findOne({_id: id}).populate("favourites");
        const favouriteBooks = userData.favourites;
        
        return res.json({status: "success", data: favouriteBooks})
    }
    catch(err){
        return res.status(500).json({message: "An Error Occured"});
    }
})

module.exports = router;