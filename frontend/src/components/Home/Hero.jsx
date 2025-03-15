import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-screen md:h-[75vh] flex flex-col justify-center md:flex-row items-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <div className="pr-14">
          <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
            Discover Your Next Great Read
          </h1>
        </div>
        <div className="pr-20">
          <p className="mt-4 text-xl text-zinc-300  text-center lg:text-left">
            Uncover captivating stories, enriching knowledge, and endless
            inspiratioin our curated collection of books
          </p>
        </div>
        <div className="flex  items-start">
          <Link to="/all-books" className="mt-6 mr-20 text-yellow-100 text-2xl mb-6 font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center rounded-lg">
        <img className="rounded-lg" src="./hero2.jpg" alt="hero" />

      </div>
    </div>
  );
};

export default Hero;
