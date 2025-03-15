import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState();
  // console.log(FavouriteBooks)

  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/app/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks]);

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className="text-5xl h-[90%] font-semibold text-zinc-500 flex items-center flex-col justify-center w-full">
          {" "}
          No Favourite Books
          <img src="./favorite1.webp" alt="star" className="h-[20vh] my-8" />
        </div>
      )}
      <div className="grid grid-cols-4">
        {FavouriteBooks &&
          FavouriteBooks.map((item, i) => (
            <div key={i}>
              {" "}
              <BookCard items={item} favourite={true} />{" "}
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
