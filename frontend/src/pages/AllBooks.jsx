import {React, useState, useEffect} from 'react'
import axios from "axios"
import Loader from "../components/Loader/Loader";
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {

  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        // Ensure the protocol matches the backend server setup
        const response = await axios.get(
          "http://localhost:3000/app/v1/get-all-books"
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
    
      <div className='bg-zinc-900 px-12 py-8 w-full h-auto'>
        <h4 className="text-3xl text-yellow-100">All Books</h4>
        {!Data && (<div className="w-full h-[70vh] flex items-center justify-center"> <Loader /> </div>)}
        <div className="my-8 grid grid-cols-1 sm:grid-col-3 md:grid-cols-4 gap-8">
          {Data &&
            Data.map((items, i) => (
              <div key={i} className="">
                <BookCard items={items}/>
              </div>
            ))}
        </div>
      </div>
  )
}

export default AllBooks