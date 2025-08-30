import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/v1/activity/${id}`)
      .then((res) => setActivity(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }
    try {
      await api.post("/api/v1/create-cart", {
        activityId: id,
        totalTicket: Number(quantity),
      });
      alert("Ditambahkan ke Cart!");
      navigate("/cart");
    } catch (e) {
      console.error(e);
      alert("Gagal menambahkan ke Cart.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!activity) return <div className="p-6">Aktivitas tidak ditemukan.</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <button
          onClick={() => navigate("/")}
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
        >
          ← Kembali ke Home
        </button>

        <h1 className="text-2xl font-bold mb-4">{activity.title}</h1>

        <img
          src={activity.imageUrls?.[0]}
          alt={activity.title}
          className="w-full max-w-2xl h-56 object-cover rounded mb-4 shadow"
        />

        <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
        <p className="font-bold mt-2 text-sm">Kota: {activity.city}</p>
        <p className="font-bold text-blue-600 text-sm">
          Harga: Rp {Number(activity.price).toLocaleString()}
        </p>

        <div className="flex gap-3 mt-5">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 w-20 rounded text-sm"
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
