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
    <div className="bg-blue-500 border p-6 rounded max-w-md mx-auto mt-20 flex flex-col items-center">
  <h1 className="text-black text-2xl font-bold text-center mb-6">LOGIN</h1>

  <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
    <label htmlFor="role" className="font-semibold text-black">
      Select Role:
    </label>
    <select
      id="role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="p-2 bg-white rounded w-full"
    >
      <option value="Volunteer">Volunteer</option>
      <option value="Restaurant">Restaurant</option>
      <option value="NGO">NGO</option>
    </select>

    <label htmlFor="email" className="font-semibold text-black">
      Email:
    </label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter Your Email"
      className="p-2 bg-white rounded w-full"
    />

    <label htmlFor="password" className="font-semibold text-black">
      Password:
    </label>
    <input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter Your Password"
      className="p-2 bg-white rounded w-full"
    />

    <Button
      type="submit"
      className="mx-auto"
    >
      Login
    </Button>
  </form>
</div>

  );
};

export default Login;
