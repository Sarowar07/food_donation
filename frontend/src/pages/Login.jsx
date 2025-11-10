import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ setIsLoggedIn }) => {
  const [role, setRole] = useState("Volunteer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/${role.toLowerCase()}/login`,
        { email, password },
        { withCredentials: true }
      );

      Cookies.set("role", role);
      Cookies.set(
        "name",
        response.data.user?.vol_name ||
          response.data.user?.res_name ||
          response.data.user?.ngo_name
      );
       Cookies.set(
        "id",
        response.data.user?.vol_id ||
          response.data.user?.res_id ||
          response.data.user?.ngo_id
      );
  

      setIsLoggedIn(true);
      navigate("/"); 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-start mt-20 justify-center">
      <div className="flex flex-col items-center justify-center w-full max-w-sm border border-primary/30 shadow-xl shadow-primary/20 rounded-md">
        <h1 className="text-2xl font-bold text-center my-3 ">Login</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-40 p-2 rounded border-2 border-gray-300 outline-none"
        >
          <option value="">Select Role</option>
          <option value="Volunteer">Volunteer</option>
          <option value="NGO">NGO</option>
          <option value="Restaurant">Restaurant</option>
        </select>
        <form onSubmit={handleLogin} className="flex flex-col w-full gap-2 px-3">
          
          <label className="font-bold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            className="p-2 rounded border-2 border-gray-300 outline-none"
          />
          
          <label className="font-bold">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password@123"
            className="p-2 rounded border-2 border-gray-300 outline-none"
          />
        </form>
        <Button type="submit" className="mb-3">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
