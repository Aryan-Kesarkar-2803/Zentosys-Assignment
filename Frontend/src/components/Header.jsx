import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleLogin } from '../slices/loginSlice';
import { setRole } from '../slices/roleSlice';

const Header = () => {
  const isLogin = useSelector(state => state.loginReducer.isLogin);
  const role = useSelector(state => state.roleReducer.role);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('user')){
      dispatch(toggleLogin())
    }
  },[])

const logout = async() =>{
  await axios.post("http://localhost:8000/logout",{
    token:localStorage.getItem("token")
  })
  .then(()=>{
    dispatch(toggleLogin());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setRole(""));
  })
  .catch((e)=>{
    alert("Error in Logout");
    dispatch(toggleLogin());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setRole(""));
  })
}
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-lg font-semibold">Movie Booking</div>
      <nav className="flex-1 flex justify-center gap-6">
        {
          role == 'admin'?
           <Link to="/insertmovie" className="hover:text-gray-300">Add Movie</Link>
          :
          <></>
          }
       
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/movies" className="hover:text-gray-300">Movies</Link>
        {
          role == "admin"?
          <Link to="/details" className="hover:text-gray-300">Details</Link>
          :
          <></>
        }
      </nav>
      {isLogin ? 
      <div className='flex text-xl space-x-3'>
        <h2>
          Welcome! {localStorage.getItem("user")}
        </h2>
        <button className="bg-red-400 px-4 py-1 rounded hover:bg-blue-500"
        onClick={logout}
        >
          Logout
        </button>
      </div>
     :
      <Link to="/login">
        <button className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600">
          Login
        </button>
      </Link>
    }
     
    </header>
  );
};

export default Header;
