import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-Books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  // checking value of isLoggedIn from authSlice
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role)


  // console.log(isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if(isLoggedIn === true && role === "user"){
    links.splice(4, 1);
  }
  if(isLoggedIn === true && role === "admin"){
    links.splice(2, 2);
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  const toggleMobileNav = () => {
    setMobileNav(MobileNav === "hidden" ? "block" : "hidden");
  };

  return (
    <>
      <nav className="z-50 relative bg-zinc-800 text-white px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="font-semibold text-2xl">BookTopia</h1>
        </Link>
        <div className="nav-links-booktopia block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, i) => (
              
              <div className="flex items-center">
                {item.title === "Profile" || item.title === "Admin Profile" ? <Link
                to={item.link}
                className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300 text-lg"
                key={i}
              >
                {item.title}
              </Link> : <Link
                to={item.link}
                className="hover:text-blue-500 transition-all duration-300 cursor-pointer text-lg"
                key={i}
              >
                {item.title}
              </Link>}
              
              </div>
            ))}
          </div>

          {isLoggedIn === false && <div className="hidden md:flex gap-4">
            <Link
              to="/LogIn"
              className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300 text-lg"
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300 text-lg"
            >
              SignUp
            </Link>
          </div>}

          
          <button className="lg:hidden md:block" onClick={toggleMobileNav}>
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`${MobileNav} bg-zinc-800 font-semibold h-screen absolute top-0 left-0 w-full z-30 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="text-white hover:text-blue-500 transition-all duration-300 cursor-pointer text-3xl m-6"
            key={i}
            onClick={toggleMobileNav} // Close mobile nav on link click
          >
            {item.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="/LogIn"
              className="px-3 m-6 py-2 border border-blue-500 text-white bg-zinc-800 rounded hover:bg-white hover:text-zinc-800 font-semibold transition-all duration-300 text-2xl"
              onClick={toggleMobileNav} // Close mobile nav on link click
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="px-3 m-6 py-2 bg-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300 font-semibold text-2xl"
              onClick={toggleMobileNav} // Close mobile nav on link click
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
