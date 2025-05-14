import axios from "axios";
import React, { useState } from "react";

const MovieDetails = ({ movie }) => {
    const[currentMovie, setCurrentMovie] = useState(movie);
  const bookedSeats = currentMovie.seats
    .filter((seat) => seat.isBooked && seat.username)
    .reduce((acc, seat) => {
      if (!acc[seat.username]) acc[seat.username] = [];
      acc[seat.username].push(seat.seatNumber);
      return acc;
    }, {});
  
  const deleteSeats = async(user,movieName) =>{
    await axios.post("http://localhost:8000/movies/deleteseats",{
        user:user,
        name:movieName
    },{
        headers:{
            Authorization: localStorage.getItem("token")
        }
    }).then((res)=>{
        setCurrentMovie(res.data.movie[0])
    })
  }

  return (
    <div className="p-6 bg-white shadow rounded max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        {movie.name} - Booked Seats
      </h2>
      {Object.keys(bookedSeats).length === 0 ? (
        <p className="text-center text-gray-500">No seats booked yet.</p>
      ) : (
        <ul className="space-y-3">
          {Object.entries(bookedSeats).map(([user, seats]) => (
            <div
              key={user}
              className="bg-gray-100 p-3 rounded flex justify-between"
            >
              <strong className="text-blue-600">{user}</strong>Seats{" "}
              {seats.join(", ")}
              <button className="bg-red-600 text-white px-2 py-1 "
              onClick={()=>{deleteSeats(user,movie.name)}}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieDetails;
