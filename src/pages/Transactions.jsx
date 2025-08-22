import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTransactions = () => {
    axios.get(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/transactions`, {
      headers: { 
        apiKey: import.meta.env.VITE_TRAVEL_API_KEY, 
        Authorization: `Bearer ${token}` 
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

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/transaction/${id}`, {
      headers: { 
        apiKey: import.meta.env.VITE_TRAVEL_API_KEY, 
        Authorization: `Bearer ${token}` 
      },
    });
    fetchTransactions();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-6">Daftar Transaksi</h1>
        {transactions.length === 0 ? (
          <p className="text-sm">Belum ada transaksi.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Judul</th>
                <th className="p-2 border">Jumlah</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id}>
                  <td className="p-2 border">{trx.activity.title}</td>
                  <td className="p-2 border">{trx.totalTicket}</td>
                  <td className="p-2 border">
                    Rp {trx.totalPrice.toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(trx.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
