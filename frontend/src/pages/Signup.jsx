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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow flex flex-col gap-3">
      <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 rounded border">
          <option value="">Select Role</option>
          <option value="Volunteer">Volunteer</option>
          <option value="NGO">NGO</option>
          <option value="Restaurant">Restaurant</option>
        </select>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={role === "Restaurant" ? "Restaurant Name" : role === "NGO" ? "NGO Name" : "Your Name"}
          className="p-2 rounded border"
        />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abc@gmail.com" className="p-2 rounded border" />
        <input type="tel" value={phn_no} onChange={(e) => setPhn(e.target.value)} placeholder="+91 9876543210" className="p-2 rounded border" />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Domkal,Murshidabad,West Bengal,742406" className="p-2 rounded border" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ABCabc@123" className="p-2 rounded border" />

        <Button type="submit">Signup</Button>
      </form>
    </div>
  );
};

export default Signup;
