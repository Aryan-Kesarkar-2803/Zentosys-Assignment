const express = require("express")
const app = express();
const cors = require("cors")
const router = require("./routes/basicRouter");
const { default: mongoose } = require("mongoose");

const PORT = 8000;

app.use(cors())

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
},)

const connectMongoDB = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/MovieSeatBooking");
        console.log("MongoDB Connected")
    }
    catch(error){
        console.log("Error Connecting MongoDB - "+error);
    }
}
connectMongoDB();

app.use(express.json())
app.use("",router)

