import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import MovieCard from "./MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [displayMovie, setDisplayMovie] = useState({
    isDisplay: false,
    name: "",
  });
  const [currentMovie, setCurrentMovie] = useState();
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.loginReducer.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  useEffect(() => {
    const fetchMovies = async () => {
      await axios
        .get("http://localhost:8000/getmovies", {
          headers: {
            Authorization:localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setMovies(res.data.movies);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMovies();
  }, []);

  return (
    <div>
      {displayMovie.isDisplay ? (
        <MovieCard movie={currentMovie}/>
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-bold text-center mb-6">
            Available Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div
                className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer transition duration-200 text-center hover:bg-blue-100"
                onClick={() => {
                  setDisplayMovie({
                    isDisplay: !displayMovie.isDisplay,
                    name: movie.name,
                  });
                  setCurrentMovie(movie);
                }}
              >
                <h3 className="text-lg font-semibold" key={movie._id}>
                  {movie.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
