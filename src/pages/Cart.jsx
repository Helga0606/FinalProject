import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    api.get("/api/v1/carts")
      .then((res) => setCart(res.data.data || []))
      .catch((e) => console.error(e));
  }, [token]);

  const handleDelete = async (cartId) => {
    try {
      await api.delete(`/api/v1/cart/${cartId}`);
      setCart((prev) => prev.filter((c) => c.id !== cartId));
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus item dari cart.");
    }
  };

  const totalHarga = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item.activity?.price) || 0;
      const qty = Number(item.totalTicket) || 0;
      return sum + price * qty;
    }, 0);
  }, [cart]);

  if (!token) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-4">Keranjang Saya</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-red-500">Silakan login terlebih dahulu.</p>
          </div>
        </main>
      </div>
    );
  }

  const handleGoToTransactions = () => {
    // Di beberapa API, checkout memerlukan endpoint khusus.
    // Jika koleksi Postman menyediakan "create-transaction", panggil di sini.
    // Untuk aman, kita arahkan ke halaman transaksi (yang menarik data transaksi user).
    navigate("/transactions");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Keranjang Saya</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Keranjang kosong.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-sm">
                    {item.activity?.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.totalTicket} Tiket • Rp{" "}
                    {Number(item.activity?.price).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            ))}

            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <p className="text-sm">
                <span className="text-gray-500">Total:</span>{" "}
                <span className="font-semibold">
                  Rp {Number(totalHarga).toLocaleString()}
                </span>
              </p>
              <button
                onClick={handleGoToTransactions}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              >
                Lanjut ke Transaksi
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
