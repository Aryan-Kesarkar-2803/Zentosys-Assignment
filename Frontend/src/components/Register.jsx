import axios from 'axios';
import { useState } from 'react';
import { NavLink, redirect, useNavigate } from 'react-router';

const Register = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8000/register",{
      username,
      password
    }).catch((e)=>{
      alert("check Username or password");
      console.log("Error Registering user - "+e)
      return;
    })
    
    if(response.request.status == 201){
      console.log("User created");
      navigate("/login");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={username}
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <div className='text-stone-600 text-center mt-2'>
            <NavLink to="/login">
                <h2>Login</h2>
            </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
