import { useSelector } from "react-redux";

const Home = () => {

  const isLogin = useSelector(state => state.loginReducer.isLogin);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Movie Booking System</h1>
      <p className="text-lg text-gray-600 mb-6">Book your favorite seats for the latest movies easily.</p>
      <div className="flex gap-4">
       {
        isLogin ?
        <></>:
         <a href="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Login
        </a>
       }
       
      </div>
    </div>
  );
};

export default Home;
