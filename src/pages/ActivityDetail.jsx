import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/activity/${id}`, {
        headers: {
          "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
        },
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
            "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Berhasil ditambahkan ke Cart!");
      window.location.href = "/cart";
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan ke Cart.");
    }
  };

  if (!activity) return <p>Memuat...</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold">{activity.title}</h1>
        <img
          src={activity.imageUrls[0]}
          alt={activity.title}
          className="w-full h-96 object-cover rounded my-4"
        />
        <p>{activity.description}</p>
        <p className="font-bold mt-2">Kota: {activity.city}</p>
        <p className="font-bold">Harga: Rp {activity.price.toLocaleString()}</p>

        <div className="flex gap-4 mt-4">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 w-20 rounded"
          />
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            Tambah ke Cart
          </button>
        </div>
      </div>
    </div>
  );
}
