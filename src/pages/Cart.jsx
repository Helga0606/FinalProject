import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCart = () => {
    axios
      .get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/carts`, {
        headers: {
          "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
          Authorization: `Bearer ${token}`,
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

  const handleDeleteCartItem = async (id) => {
    if (!window.confirm("Yakin ingin menghapus item dari Cart?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/cart/${id}`,
        {
          headers: {
            "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus item cart.");
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/create-transaction`,
        {},
        {
          headers: {
            "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Checkout berhasil! Silakan lihat di halaman transaksi.");
      window.location.href = "/transactions";
    } catch (err) {
      console.error(err);
      alert("Checkout gagal.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Keranjang Saya</h1>

        {cartItems.length === 0 ? (
          <p>Keranjang kosong.</p>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Judul</th>
                  <th className="border border-gray-300 p-2">Jumlah Tiket</th>
                  <th className="border border-gray-300 p-2">Harga</th>
                  <th className="border border-gray-300 p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">{item.id}</td>
                    <td className="border border-gray-300 p-2">{item.activity.title}</td>
                    <td className="border border-gray-300 p-2">{item.totalTicket}</td>
                    <td className="border border-gray-300 p-2">
                      Rp {item.activity.price.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => handleDeleteCartItem(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
