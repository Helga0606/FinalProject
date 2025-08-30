import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/api/v1/banners"),
      api.get("/api/v1/activities"),
    ])
      .then(([bannersRes, activitiesRes]) => {
        setBanners(bannersRes.data.data || []);
        setActivities(activitiesRes.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Banner (kecil, tidak full width) */}
        <div className="mb-8 flex justify-center">
          {loading ? (
            <div className="h-28 w-full max-w-3xl bg-gray-300 rounded-lg animate-pulse"></div>
          ) : banners.length > 0 ? (
            <img
              src={banners[0].imageUrl}
              alt="Banner"
              className="h-28 w-full max-w-3xl object-cover rounded-lg shadow"
            />
          ) : (
            <div className="h-28 w-full max-w-3xl bg-gray-200 rounded-lg grid place-items-center text-sm text-gray-500">
              Tidak ada banner
            </div>
          )}
        </div>

        {/* Form pencarian (dummy UI) */}
        <div className="bg-white p-4 rounded-lg shadow mb-10 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold mb-3">Cari Tiket & Aktivitas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <input className="border p-2 rounded" placeholder="Dari kota" />
            <input className="border p-2 rounded" placeholder="Ke kota" />
            <input type="date" className="border p-2 rounded" />
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Cari Sekarang
          </button>
        </div>

        {/* Aktivitas (kartu kecil, gambar tidak besar) */}
        <h2 className="text-lg font-bold mb-4">Promo & Aktivitas Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(loading ? Array.from({ length: 8 }) : activities.slice(0, 12)).map(
            (act, i) => (
              <div
                key={act?.id || i}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-3"
              >
                {loading ? (
                  <div className="h-28 w-full bg-gray-200 rounded animate-pulse" />
                ) : (
                  <>
                    <img
                      src={act.imageUrls?.[0]}
                      alt={act.title}
                      className="h-28 w-full object-cover rounded"
                    />
                    <h3 className="text-base font-semibold mt-2 line-clamp-2">
                      {act.title}
                    </h3>
                    <p className="text-gray-500 text-xs">{act.city}</p>
                    <p className="font-bold text-blue-600 mt-1 text-sm">
                      Rp {Number(act.price).toLocaleString()}
                    </p>
                    <Link
                      to={`/activity/${act.id}`}
                      className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                    >
                      Lihat Detail →
                    </Link>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
