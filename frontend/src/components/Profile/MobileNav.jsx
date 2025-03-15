import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MobileNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      {role === "user" && (
        <div className="w-full flex lg:hidden items-center justify-between mt-4">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-zinc-100 py-2 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 py-2 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex lg:hidden items-center justify-between mt-4">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-100 py-2 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            Add Book
          </Link>
          
        </div>
      )}
    </>
  );
};

export default MobileNav;
