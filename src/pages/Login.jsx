import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_TRAVEL_API_BASE_URL}/api/v1/login`,
        { email, password },
        {
          headers: {
            "apiKey": import.meta.env.VITE_TRAVEL_API_KEY,
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      alert("Login berhasil!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login gagal. Cek email & password.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="max-w-sm">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
