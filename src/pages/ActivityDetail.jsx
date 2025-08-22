import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/activity/${id}`, {
      headers: { apiKey: import.meta.env.VITE_TRAVEL_API_KEY },
    })
    .then((res) => setActivity(res.data.data))
    .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "/login";
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/create-cart`,
        { activityId: id, totalTicket: quantity },
        {
          headers: {
            apiKey: import.meta.env.VITE_TRAVEL_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Ditambahkan ke Cart!");
      window.location.href = "/cart";
    } catch {
      alert("Gagal menambahkan ke Cart.");
    }
  };

  if (!activity) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{activity.title}</h1>
        <img
          src={activity.imageUrls[0]}
          alt={activity.title}
          className="w-full h-56 object-cover rounded my-3"
        />
        <p className="text-sm">{activity.description}</p>
        <p className="font-bold mt-2 text-sm">Kota: {activity.city}</p>
        <p className="font-bold text-blue-600 text-sm">
          Harga: Rp {activity.price.toLocaleString()}
        </p>

        <div className="flex gap-3 mt-4">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-1 w-20 rounded text-sm"
          />
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600"
          >
            Tambah ke Cart
          </button>
        </div>
      </main>
    </div>
  );
}
