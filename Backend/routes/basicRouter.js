const {Router} = require("express");
const { handleLogin, registerUser, logout, insertMovie, getMovies, bookSeats, deleteSeats } = require("../controllers/controllers");
const { authMiddleware } = require("../middlewares/auth");
const router = Router();

router.post("/login",handleLogin)
router.post("/register",registerUser)
router.post("/logout",logout)
router.post("/insertmovie",authMiddleware,insertMovie);
router.get("/getmovies",authMiddleware,getMovies);
router.post("/movies/bookseats",authMiddleware,bookSeats)
router.post("/movies/deleteseats",authMiddleware,deleteSeats)

module.exports  = router


