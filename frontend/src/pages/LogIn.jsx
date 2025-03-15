import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {

  const [Values, setValues] = useState({
    username: "",
    password: "",
  })

  const navigate = useNavigate();
  // selected chiz ko action perform krne ke lie use hota hia 
  const dispatch = useDispatch()

  const change = (e)=>{
    const {name, value} = e.target;
    setValues({...Values, [name]: value})
  }

  const submit = async()=>{
    console.log(Values)
    try{
      if(Values.username === "" || Values.password === ""){
        alert("All fields are required")
      }
      else{
        
        const response = await axios.post("http://localhost:3000/app/v1/sign-in", {username: Values.username, password: Values.password});
        console.log(response.data);
        // navigate("/login")

        dispatch(authActions.login());  // basically authSlicer mai jaake action mai login wale o chala ke isLoggedIn ko true kr diya
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.role)
        navigate("/profile")
      }
    }
    catch(err){
      alert(err.response.data.message)
    }
  }

  return (
    <div className="h-[88vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl"> Login</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              reqiuired
              value={Values.username}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="password"
            name="password"
            required
            value={Values.password}
            onChange={change}
          />
        </div>
        
        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600" onClick={submit}>
            Login
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Already have an account? &nbsp;
          <Link to="/signup" className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login