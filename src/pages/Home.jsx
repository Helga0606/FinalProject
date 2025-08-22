import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/activities`, {
      headers: { apiKey: import.meta.env.VITE_TRAVEL_API_KEY },
    })
    .then((res) => setActivities(res.data.data))
    .catch((err) => console.error(err));

    axios.get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/banners`, {
      headers: { apiKey: import.meta.env.VITE_TRAVEL_API_KEY },
    })
    .then((res) => setBanners(res.data.data))
    .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Cari destinasi, promo..."
            className="w-1/2 p-2 border rounded text-sm"
          />
          <button className="px-3 py-2 bg-blue-500 text-white rounded text-sm">
            Masuk
          </button>
        </div>

          {/* Banner */}
          <div className="mb-6 flex justify-center">
            {banners.length > 0 ? (
              <img
                src={banners[0].imageUrl}
                alt="Banner"
                className="h-24 w-full max-w-3xl object-cover rounded-md shadow" 
              />
            ) : (
              <div className="h-24 w-full max-w-3xl bg-gray-300 rounded-md animate-pulse"></div>
            )}
          </div>

        {/* Destinasi */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Destinasi Populer</h2>
          <a href="#" className="text-blue-500 text-sm hover:underline">
            Lihat Semua
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activities.slice(0, 8).map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-3"
            >
              <img
                src={act.imageUrls[0]}
                alt={act.title}
                className="h-32 w-full object-cover rounded"
              />
              <h3 className="text-base font-bold mt-2">{act.title}</h3>
              <p className="text-gray-500 text-sm">{act.city}</p>
              <p className="font-bold text-blue-600 mt-1 text-sm">
                Rp {act.price.toLocaleString()}
              </p>
              <Link
                to={`/activity/${act.id}`}
                className="mt-2 block bg-blue-500 text-white text-center py-1 rounded text-sm hover:bg-blue-600"
              >
                Detail
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
