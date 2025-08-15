import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/activities`, {
        headers: {
          "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
        },
      })
      .then((res) => setActivities(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Destinasi Wisata</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((act) => (
            <div key={act.id} className="border rounded shadow p-4">
              <img
                src={act.imageUrls[0]}
                alt={act.title}
                className="h-48 w-full object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-2">{act.title}</h2>
              <p className="text-gray-600">{act.city}</p>
              <p className="font-bold mt-2">
                Rp {act.price.toLocaleString()}
              </p>
              <Link
                to={`/activity/${act.id}`}
                className="block bg-blue-500 text-white text-center py-2 mt-3 rounded hover:bg-blue-600"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
