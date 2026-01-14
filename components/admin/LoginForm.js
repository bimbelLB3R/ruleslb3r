import { useState } from "react";
import Swal from "sweetalert2";

export default function LoginForm({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        Swal.fire("Login Berhasil", "Selamat datang!", "success");
        onLoginSuccess(data.admin);
      } else {
        Swal.fire("Login Gagal", data.error, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <img src="/image/logolb3r.png" alt="Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Bimbel LB3R</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        
        <p className="text-xs text-gray-400 text-center mt-4">
          Default: admin / admin123
        </p>
      </div>
    </div>
  );
}