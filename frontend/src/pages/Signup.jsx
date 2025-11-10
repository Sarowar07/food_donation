import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phn_no, setPhn] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) return alert("Please select a role");

    const userData = { name, email, address, password, phn_no };

    try {
      const res = await axios.post(
        `http://localhost:8000/${role.toLowerCase()}/signup`,
        userData,
        { withCredentials: true }
      );

      Cookies.set("role", role);
      Cookies.set("name", name);

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full max-w-sm border border-primary/30 shadow-xl shadow-primary/20 rounded-md">
        <h1 className="text-2xl font-bold text-center my-3 ">Signup</h1>
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
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2 px-3">
          <label className="font-bold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              role === "Restaurant"
                ? "eg. Zaika Biriyani"
                : role === "NGO"
                ? "eg. Smile Foundation"
                : "eg. Monkey D. Luffy"
            }
            className="p-2 rounded border-2 border-gray-300 outline-none "
          />
          <label className="font-bold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            className="p-2 rounded border-2 border-gray-300 outline-none"
          />
          <label className="font-bold">Phone No:</label>
          <input
            type="tel"
            value={phn_no}
            onChange={(e) => setPhn(e.target.value)}
            placeholder="+91 9876543210"
            className="p-2 rounded border-2 border-gray-300 outline-none"
          />
          <label className="font-bold">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Domkal,Murshidabad,West Bengal"
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
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Signup;
