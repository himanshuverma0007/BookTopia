const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
  },
  { timestamps: true }   // it helps in sorting of books 
//   with the help of timestamps we are gettting createdAt and updatedAt so on the basis of that we can sort 
);

module.exports = mongoose.model("books", bookSchema);