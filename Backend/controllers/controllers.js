const Movie = require("../models/movie");
const { Users } = require("../models/users");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ABCD@123";

async function handleLogin(req, res) {
  const body = req.body;
  const user = await Users.find({ username: body.username });
  if (!user) {
    console.log("User not found");
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  let token = jwt.sign(
    {
      username: user[0].username,
      role: user[0].role,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  token = `Bearer ${token}`;
  res.status(200).json({
    token,
    username: user[0].username,
    role: user[0].role,
  });
}
async function registerUser(req, res) {
  const body = req.body;

  const resp = await Users.create({
    username: body.username,
    password: body.password,
    role: "user",
  })
    .then((res) => {
      console.log("user created + " + res);
    })
    .catch((e) => {
      console.log("Error Creating user - " + e);
      res.status(501).json({
        message: "Error Creating User",
      });
      return;
    });

  res.status(201).json({
    message: "User Created Successfully",
  });
}

async function logout(req, res) {
  const token = req.body.token;
  if (!token) {
    res.status(401).json({
      message: "Invalid User",
    });
  }
  const decodedToken = jwt.decode(token);
  res.status(200).json({
    message: "Logout Successfull",
  });
}
async function insertMovie(req, res) {
  const body = req.body;
  const seatsArray = Array.from({ length: 25 }, (_, i) => ({
    seatNumber: i + 1,
    isBooked: false,
    username: null,
  }));
  await Movie.create({
    name: body.name,
    username: body.username,
    seats: seatsArray,
  })
    .then(() => {
      res.status(201).json({
        message: "Movie Created Sucessfully",
      });
    })
    .catch((e) => {
      console.log("Error in creating movie " + e);
      res.status(501).json({
        message: "Error in creating Movie",
      });
    });
}

async function getMovies(req, res) {
  const movies = await Movie.find().catch((err) => {
    console.log("Error in fetching movies " + err);
    res.status(501).json({
      message: "Error in Fetching Movies",
    });
    return;
  });

  res.status(200).json({
    message: "Movies fetched",
    movies,
  });
}

async function bookSeats(req, res) {
  const selectedSeats = req.body.selectedSeats;
  const name = req.body.name;

  selectedSeats.map(async (seat) => {
    await Movie.findOneAndUpdate(
      { name: name, "seats.seatNumber": seat },
      { $set: { "seats.$.isBooked": true, "seats.$.username": req.user } }
    );
  });
  const currentMovie = await Movie.find({name:name});
  res.status(200).json({
    movie:currentMovie
  });
}

async function deleteSeats(req,res){
    const user = req.body.user;
    const name = req.body.name;
    await Movie.updateMany({
        name:name,
        "seats.username":user
    },
    {
        $set:{
            "seats.$[elem].isBooked":false,
            "seats.$[elem].username":null
        }
    },
    {arrayFilters: [{ "elem.username": user }]}
).catch((err)=>{
console.log("Error in Cancelling seats "+err);
res.status(500).json({
  message:"Error in Unbooking Seats"
})
})

const movie = await Movie.find({name:name});
res.status(200).json({
  movie
})
    
}

module.exports = {
  handleLogin,
  registerUser,
  logout,
  insertMovie,
  getMovies,
  bookSeats,
  deleteSeats
};
