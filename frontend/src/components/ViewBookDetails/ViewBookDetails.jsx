import { useParams, useNavigate, Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  console.log(isLoggedIn, role);

  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        // Ensure the protocol matches the backend server setup
        const response = await axios.get(
          `http://localhost:3000/app/v1/get-book-by-id/${id}`
        ); // Use http if backend does not have SSL
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  // adding book to favourite 
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  }

  const handleFavourite = async()=>{
    const response = await axios.put("http://localhost:3000/app/v1/add-book-to-favourite", {}, {headers})
    alert(response.data.message);
  }

  // add to cart functionality 
  const handlecart = async()=>{
    const response = await axios.put("http://localhost:3000/app/v1/add-book-to-cart", {}, {headers})
    alert(response.data.message);
  }

  const deleteBook = async()=>{
    const response = await axios.delete("http://localhost:3000/app/v1/delete-book", {headers})
    alert(response.data.message);
    navigate("/all-Books");
    
  }

  return (
    <>
      {!Data && (
        <div className="h-screen bg-zinc-800 flex justify-center  items-center text-xl">
          <Loader />
        </div>
      )}
      {Data && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row ">
          <div className="bg-zinc-800 rounded p-4 h-[70vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center flex-col justify-around gap-8 md:flex-row">
            <img
              src={Data.url}
              alt="image"
              className="h-[50vh] lg:h-[70vh] rounded"
            />
            {/* if it is user  */}
            {isLoggedIn === true && role === "user" && (
              <div className="h-[80%] flex md:flex-col gap-4">
                <button
                  className="bg-white rounded-full text-3xl p-2 text-red-500"
                  onClick={handleFavourite}
                >
                  <FaHeart />
                </button>
                <button className="bg-white rounded-full text-3xl p-2 mt-4 text-blue-500" onClick={handlecart}>
                  <FaShoppingCart />
                </button>
              </div>
            )}

            {/* if it is admin  */}
            {isLoggedIn === true && role === "admin" && (
              <div className="h-[80%] flex md:flex-col gap-4" >
                <Link to={`/update-book/${id}`} className="bg-white rounded-full text-3xl p-2 text-black"
                //  onClick={updateBook}
                 >
                  <MdEditSquare />
                </Link>
                <button className="bg-white rounded-full text-3xl p-2 mt-4 text-red-500" onClick={deleteBook}>
                  <MdOutlineDelete />
                </button>
              </div>
            )}
          </div>
          {/* <img src={Data.url} alt="image" className="h-[50vh] lg:h-[70vh] rounded" />
            <div className="flex md:flex-col">
              <button className="bg-white rounded-full text-2xl p-2"><FaHeart /></button>
              <button className="bg-white rounded-full text-2xl p-2 mt-4"><FaShoppingCart /></button>
            </div> */}
          <div className="p-4 w-full lg:w-3/6 ">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="text-zinc-400 mt-4 flex items-center">
              <GrLanguage className="me-3" />
              {Data.language}
            </p>
            <p className="text-zinc-100 mt-4 text-3xl font-semibold">
              Price: ₹{Data.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
