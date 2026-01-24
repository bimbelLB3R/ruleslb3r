import { useState, useEffect } from "react";
import Head from "next/head";
import LoginForm from "../../components/admin/LoginForm";
import AdminLayout from "../../components/admin/AdminLayout";
import SoalList from "../../components/admin/SoalList";
import SoalForm from "../../components/admin/SoalForm";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [kategori, setKategori] = useState("snbt");
  const [editData, setEditData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // ✅ Tambah state untuk total soal
  const [totalSoal, setTotalSoal] = useState(0);
  const [loadingStats, setLoadingStats] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      try {
        const parsed = JSON.parse(storedAdmin);
        setAdmin(parsed);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid admin data:", error);
        localStorage.removeItem("admin");
      }
    }
  }, []);

  // ✅ Fetch total soal setiap kali kategori berubah
  useEffect(() => {
    if (isLoggedIn) {
      fetchTotalSoal();
    }
  }, [kategori, isLoggedIn, refreshTrigger]);

  // ✅ Function untuk fetch total soal
  const fetchTotalSoal = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`/api/admin/soal/stats?kategori=${kategori}`);
      const data = await response.json();
      
      if (response.ok) {
        setTotalSoal(data.total);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setTotalSoal(0);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLoginSuccess = (adminData) => {
    setAdmin(adminData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    setIsLoggedIn(false);
    setActiveTab("list");
    setEditData(null);
  };

  const handleEdit = (soal) => {
  const { created_at, updated_at, ...cleanSoal } = soal;
  setEditData(cleanSoal);
  setActiveTab("edit");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const handleFormSuccess = () => {
    setActiveTab("list");
    setEditData(null);
    setRefreshTrigger((prev) => prev + 1); // ✅ Ini akan trigger fetch ulang total
  };

  const handleCancelForm = () => {
    setActiveTab("list");
    setEditData(null);
  };

  const handleCreateNew = () => {
    setEditData(null);
    setActiveTab("create");
  };

  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>Admin Login - Dashboard LB3R</title>
        </Head>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard Admin - Input Soal LB3R</title>
      </Head>

      <AdminLayout admin={admin} onLogout={handleLogout}>
        {/* Kategori Selector */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <label className="block font-medium mb-2">Pilih Kategori Soal:</label>
              <select
                className="border rounded px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={kategori}
                onChange={(e) => {
                  setKategori(e.target.value);
                  setActiveTab("list");
                  setEditData(null);
                }}
              >
                <option value="snbt">SNBT (30 soal)</option>
                <option value="kuantitatif">Kuantitatif (20 soal)</option>
                <option value="matematika">Matematika (20 soal)</option>
                <option value="english">English (20 soal)</option>
                <option value="bacaan">Bacaan (20 soal)</option>
                <option value="penalaran">Penalaran (30 soal)</option>
                <option value="pengetahuan">Pengetahuan (20 soal)</option>
              </select>
            </div>

            {/* ✅ Stats Card dengan Total Soal */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Total Soal</p>
                {loadingStats ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-gray-500">Loading...</p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-blue-600">{totalSoal}</p>
                )}
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Kategori</p>
                <p className="text-2xl font-bold text-green-600 uppercase">
                  {kategori}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium transition ${
                activeTab === "list"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab("list");
                setEditData(null);
              }}
            >
              📋 Daftar Soal
            </button>
            <button
              className={`px-6 py-3 font-medium transition ${
                activeTab === "create"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={handleCreateNew}
            >
              ➕ Tambah Soal Baru
            </button>
            {activeTab === "edit" && (
              <button
                className="px-6 py-3 font-medium border-b-2 border-yellow-600 text-yellow-600"
                disabled
              >
                ✏️ Edit Soal
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "list" && (
          <SoalList
            kategori={kategori}
            onEdit={handleEdit}
            refreshTrigger={refreshTrigger}
          />
        )}

        {(activeTab === "create" || activeTab === "edit") && (
          <SoalForm
            kategori={kategori}
            editData={editData}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelForm}
          />
        )}
      </AdminLayout>
    </>
  );
}