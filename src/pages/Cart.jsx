import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCart = () => {
    axios.get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/carts`, {
      headers: { 
        apiKey: import.meta.env.VITE_TRAVEL_API_KEY, 
        Authorization: `Bearer ${token}` 
      },
    })
    .then((res) => setCartItems(res.data.data))
    .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "/login";
      return;
    }
    fetchCart();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/cart/${id}`, {
      headers: { 
        apiKey: import.meta.env.VITE_TRAVEL_API_KEY, 
        Authorization: `Bearer ${token}` 
      },
    });
    fetchCart();
  };

  const handleCheckout = async () => {
    await axios.post(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/create-transaction`, {}, {
      headers: { 
        apiKey: import.meta.env.VITE_TRAVEL_API_KEY, 
        Authorization: `Bearer ${token}` 
      },
    });
    alert("Checkout berhasil!");
    window.location.href = "/transactions";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-6">Keranjang</h1>
        {cartItems.length === 0 ? (
          <p className="text-sm">Keranjang kosong.</p>
        ) : (
          <>
            <table className="w-full border mb-4 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Judul</th>
                  <th className="p-2 border">Jumlah</th>
                  <th className="p-2 border">Harga</th>
                  <th className="p-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="p-2 border">{item.activity.title}</td>
                    <td className="p-2 border">{item.totalTicket}</td>
                    <td className="p-2 border">
                      Rp {item.activity.price.toLocaleString()}
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-5 py-2 rounded text-sm"
            >
              Checkout
            </button>
          </>
        )}
      </main>
    </div>
  );
}
