import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {

    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">

      <div className="text-2xl font-bold">
        <Link to="/">HopeMeals</Link>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:underline ">Home</Link>
        

        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200  hover:shadow-lg hover:scale-105 transition">Login</Link>
            <Link to="/signup" className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 hover:shadow-lg hover:scale-105 transition">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
