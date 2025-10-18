import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";


import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/auth/me", { withCredentials: true })
      .then(res => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Landing />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
</>
  );
}

export default function AppWrapper(){
  return (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
}

