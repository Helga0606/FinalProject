import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/login`,
        { email, password },
        { headers: { apiKey: import.meta.env.VITE_TRAVEL_API_KEY } }
      );
      localStorage.setItem("token", res.data.token);
      alert("Login berhasil!");
      window.location.href = "/";
    } catch {
      alert("Login gagal. Cek email & password.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="max-w-sm">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-3 rounded text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-3 rounded text-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full text-sm"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
