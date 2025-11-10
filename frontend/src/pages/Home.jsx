import { useEffect, useState } from "react";
import Button from "../components/Button";
import Cookies from "js-cookie";
import axios from "axios";

const Home = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const role = Cookies.get("role");
        const id = Cookies.get("id");
        
        if (!role || !id) {
          console.warn("Role or Id not found in cookies");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/delivery/${role.toLowerCase()}/history/${id}`,
          {
            withCredentials: true,
          }
        );

        setHistory(response.data);
     
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
 fetchHistory();
  }, []);

  return (
    <>
    <div>

    </div>
    <div className="min-h-screen p-4">
      <h2>Past Donations</h2>
      {history.length === 0 ? (
        <p>No past donation data</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.del_id}>
              <strong>Pickup:</strong> {item.del_pickup} <br />
              <strong>Drop:</strong> {item.del_drop} <br />
              <strong>Volunteer ID:</strong> {item.vol_id}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default Home;
