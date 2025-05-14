import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const InsertMovie = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const role = useSelector(state=> state.roleReducer.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/insertmovie", { name },
        {
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }
      );
      alert("Movie added successfully");
      setName("");
    } catch (error) {
      alert("Error adding movie");
    }
  };

  useEffect(()=>{
    if(role != "admin"){
        navigate("/")
    }
  },[role]);


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Insert Movie</h2>
        <input
          type="text"
          placeholder="Movie Name"
          className="border p-2 w-full mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default InsertMovie;
