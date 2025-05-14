import axios from "axios";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const currentUser = localStorage.getItem('user')
  const [movieData, setMovieData] = useState(movie);
  const handleSelect = (seat) => {
    if (seat.isBooked) return;
    const isSelected = selectedSeats.includes(seat.seatNumber);
    const updated = isSelected
      ? selectedSeats.filter((s) => s !== seat.seatNumber)
      : [...selectedSeats, seat.seatNumber];
    setSelectedSeats(updated);
  }

  const confirmSeats = async() =>{
    console.log(selectedSeats);
    await axios.post("http://localhost:8000/movies/bookseats",{
      selectedSeats,
      name:movieData.name
    },{
      headers:{
        Authorization: localStorage.getItem('token')
      }
    }).then((res)=>{
      
      setMovieData(res.data.movie[0])
      alert("Seats Booked");
    }).catch((err)=>{
      console.log("errors - "+err)
    })
  }

  return (
    <div className="p-4 bg-white shadow rounded mb-6 flex flex-col items-center ">
      <h2 className="text-3xl font-bold mb-4 text-center">{movieData.name}</h2>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {movieData.seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seatNumber);
          const isBooked = seat.isBooked && seat.username !== currentUser ;
          const isBookedByUser = seat.username === currentUser;

          let bgColor = "bg-gray-300";
          if (isBooked) bgColor = "bg-red-500";
          else if (isBookedByUser) bgColor = "bg-green-500";
          else if (isSelected) bgColor = "bg-blue-500";

          return (
            <div
              key={seat._id}
              onClick={() => handleSelect(seat)}
              className={`w-14 h-16 flex items-center justify-center rounded cursor-pointer text-white font-semibold ${bgColor}`}
            >
              {seat.seatNumber}
            </div>
          );
        })}
      </div>
      <button className="bg-red-500 mt-10 w-1/3  text-white hover:bg-red-600 px-3 py-2 text-2xl text-center"
      onClick={confirmSeats}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default MovieCard;
