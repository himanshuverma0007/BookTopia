import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

const BookCard = ({ items, favourite }) => {
    
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: items._id
    };

  const handleRemoveBook = async () => {

    const response = await axios.put("http://localhost:3000/app/v1/remove-book-from-favourite", {}, {headers});
   alert(response.data.message)
    
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col m-4">
      <Link to={`view-book-details/${items._id}`}>
        <div className="">
          <div className="bg-zinc-900 flex items-center justify-center rounded-md">
            <img className="h-[25vh]" src={items.url} alt="/" />
          </div>
          <h2 className="mt-4 text-zinc-200 text-xl font-semibold">
            {items.title}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold">{items.author}</p>
          <p className="mt-2 text-zinc-200 font-bold text-xl">₹{items.price}</p>
        </div>
      </Link>

      {favourite && (
        <button
          className="bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
