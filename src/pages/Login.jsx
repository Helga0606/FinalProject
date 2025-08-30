import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/v1/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login berhasil!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login gagal!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
          <h1 className="text-xl font-bold mb-4">Login</h1>
          <input
            type="email"
            placeholder="Email"
            className="border w-full p-2 rounded mb-3 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border w-full p-2 rounded mb-3 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
          >
            Login
          </button>
        </div>
      </main>
    </div>
  );
}
