import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTransactions = () => {
    if (!token) return;
    api
      .get("/api/v1/transactions")
      .then((res) => setTransactions(res.data.data || []))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (trxId) => {
    // Sesuaikan dengan endpoint di koleksi Postman (mis: /api/v1/transaction/:id)
    try {
      await api.delete(`/api/v1/transaction/${trxId}`);
      setTransactions((prev) => prev.filter((t) => t.id !== trxId));
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus transaksi.");
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-4">Transaksi</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-red-500">Silakan login terlebih dahulu.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Transaksi</h1>

        {transactions.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Belum ada transaksi.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {transactions.map((trx) => (
              <div
                key={trx.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div className="text-sm">
                  <p className="font-semibold">{trx.activity?.title}</p>
                  <p className="text-xs text-gray-500">
                    {trx.totalTicket} Tiket • Rp{" "}
                    {Number(trx.totalPrice).toLocaleString()}
                  </p>
                  <p className="text-xs">
                    Status:{" "}
                    <span className="font-medium capitalize">
                      {trx.status || "pending"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(trx.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
