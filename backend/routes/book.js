const express = require("express");
const router = express.Router();
const bookModel = require("../models/bookModel");
const authenticateToken = require("./userAuth");
const userModel = require("../models/userModel");

// add book --> admin 
router.post("/add-book", authenticateToken, async (req, res)=>{

    try{
        // admin ki id 
        const {id} = req.headers;
        const user = await userModel.findOne({_id: id});

        if(user.role !== "admin"){
            return res.status(400).json({message: "you do not have permission to add book because you are not admin"})
        }

        const {url, title, author, price, desc, language} = req.body;
        const createdBook = await bookModel.create({
            url,
            title,
            author,
            price,
            desc, 
            language
        })

        res.status(200).json({message: "Book created Successfully", createdBook});
    }
    catch{
        res.status(500).json({message: "Internal Server Error"});
    }
})

// update a book ---> admin 
router.put("/update-book", authenticateToken, async(req, res)=>{

    try{

        const {bookid} = req.headers;
        const {url, title, author, price, desc, language} = req.body;
        
        const updateBook = await bookModel.findOneAndUpdate({_id: bookid}, {url, title, author, price, desc, language}, {new: true});
        
        console.log(updateBook);
        return res.status(200).json({message: "book Updated Successfully"});
    }
    catch(err){
        return res.status(500).json({message: "An Error Occured"});
    }
    
})

// delete a book ---> admin 
router.delete("/delete-book", authenticateToken, async(req, res)=>{

    try{
        const {bookid} = req.headers;
        
        const deletedBook = await bookModel.findOneAndDelete({_id: bookid});
        console.log(deletedBook);
        return res.status(200).json({message: "Successfully deleted book"});
    }
    catch(err){
        return res.status(500).json({message: "An error occured"});
    }
})

// get all books 
router.get("/get-all-books", async(req, res)=>{

    try{
        const books = await bookModel.find().sort({createdAt: -1});
        return res.status(200).json({status: "Success", data: books});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "An error occured"});
    }
})

// get recently added books limit 4 
router.get("/get-recent-books", async(req, res)=>{

    try{
        const books = await bookModel.find().sort({createdAt: -1}).limit(4);
        return res.status(200).json({status: "Success", data: books});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "An error occured"});
    }
})

// Get book by id 
router.get("/get-book-by-id/:id", async(req, res)=>{

    try{

        const {id} = req.params;
        const book = await bookModel.findOne({_id: id});

        return res.status(200).json({status: "Success", data: book});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "An error occured"});
    }
})


module.exports = router;