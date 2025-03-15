import { React, useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import axios from "axios";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        // Ensure the protocol matches the backend server setup
        const response = await axios.get(
          "http://localhost:3000/app/v1/get-recent-books"
        ); // Use http if backend does not have SSL
        // console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently Added books</h4>
      {!Data && (<div className="flex items-center justify-center my-8"><Loader/></div>)}
      <div className="my-8 grid grid-cols-1 sm:grid-col-3 md:grid-cols-4 gap-3">
        {Data &&
          Data.map((items, i) => (
            <div key={i} className="">
              <BookCard items={items}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
