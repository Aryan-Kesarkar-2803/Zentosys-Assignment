import { useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../slices/loginSlice";
import { setRole } from "../slices/roleSlice";

const Login = () => {
  // const [form, setForm] = useState({ username: "", password: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        await axios.post("http://localhost:8000/login",{
          username,
          password
        }).then((res)=>{
          localStorage.setItem("token",res.data.token);
          localStorage.setItem("user",res.data.username);
          dispatch(setRole(res.data.role));
          dispatch(toggleLogin())
          navigate("/");
        })
        
    }catch(e){
        console.log("error in login- "+e)
    }   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          autoComplete="off"
          onChange={(e)=>{setUsername(e.target.value)}}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>
        <div className="text-stone-600 mt-2 text-center">
          <NavLink to="/register">
            <h2>Register as User</h2>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
