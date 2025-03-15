import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../../pages/Profile";
import { TbLogout } from "react-icons/tb";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col justify-between items-center h-auto lg:h-[90%]">
      <div className="flex flex-col justify-center items-center">
        <img src={data.avatar} alt="avatar" className="h-[12vh] rounded-full" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300 ">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-zinc-100 font-semibold w-full py-2 mt-1 text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2 mt-1 text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            Settings
          </Link>
        </div>
      )}
 
      {role === "admin" && (<div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full py-2 mt-1 text-center hover:bg-zinc-900 rounded transition-all duration-200"
          >
            Add Book
          </Link>
          
        </div>)} 

      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          navigate("/");
        }}
      >
        Log Out <TbLogout className="ms-2" />
      </button>
    </div>
  );
};

export default Sidebar;
