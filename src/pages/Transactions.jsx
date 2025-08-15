import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTransactions = () => {
    axios
      .get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/transactions`, {
        headers: {
          "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTransactions(res.data.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "/login";
      return;
    }
    fetchTransactions();
  }, []);

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm("Yakin ingin menghapus transaksi ini?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/transaction/${id}`,
        {
          headers: {
            "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTransactions();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus transaksi.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Daftar Transaksi</h1>

        {transactions.length === 0 ? (
          <p>Tidak ada transaksi.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Judul</th>
                <th className="border border-gray-300 p-2">Total Tiket</th>
                <th className="border border-gray-300 p-2">Total Harga</th>
                <th className="border border-gray-300 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id}>
                  <td className="border border-gray-300 p-2">{trx.id}</td>
                  <td className="border border-gray-300 p-2">{trx.activity.title}</td>
                  <td className="border border-gray-300 p-2">{trx.totalTicket}</td>
                  <td className="border border-gray-300 p-2">
                    Rp {trx.totalPrice.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleDeleteTransaction(trx.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
