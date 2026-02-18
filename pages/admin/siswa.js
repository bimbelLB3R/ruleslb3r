// pages/admin/siswa.jsx
import { useState, useEffect } from "react";
import Head from "next/head";
// import AdminLayout from "../../components/admin/AdminLayout";
import AdminLayout from "../../components/admin/AdminLayout";
// import LoginForm from "../../components/admin/LoginForm";
import LoginForm from "../../components/admin/LoginForm";
import Swal from "sweetalert2";

export default function SiswaPage() {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);

  // Data & Loading
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filter & Search
  const [search, setSearch] = useState("");
  const [sekolah, setSekolah] = useState("");
  const [sekolahList, setSekolahList] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");

  // Form Modal
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nama: "",
    nisn: "",
    asalsekolah: "",
    wa: "",
    prodi1: "",
    kampus1: "",
    prodi2: "",
    kampus2: "",
    email: "",
    foto: "",
  });

  // ─── Auth Check ────────────────────────────────────────────────────────
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("admin");
      }
    }
  }, []);

  // ─── Fetch Data ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isLoggedIn) {
      fetchSiswa();
      fetchSekolahList();
    }
  }, [isLoggedIn, page, search, sekolah, sortBy, sortOrder]);

  const fetchSiswa = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        sekolah,
        sortBy,
        sortOrder,
      });

      const res = await fetch(`/api/admin/siswa?${params}`);
      const data = await res.json();

      if (res.ok) {
        setSiswaList(data.data);
        setTotal(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Fetch siswa error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSekolahList = async () => {
    try {
      const res = await fetch("/api/admin/siswa/sekolah-list");
      const data = await res.json();
      if (res.ok) setSekolahList(data.data);
    } catch {}
  };

  // ─── Handlers ──────────────────────────────────────────────────────────
  const handleLoginSuccess = (adminData) => {
    setAdmin(adminData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    setIsLoggedIn(false);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSekolahFilter = (value) => {
    setSekolah(value);
    setPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setSekolah("");
    setSortBy("created_at");
    setSortOrder("DESC");
    setPage(1);
  };

  const handleCreate = () => {
    setFormData({
      id: null, nama: "", nisn: "", asalsekolah: "", wa: "",
      prodi1: "", kampus1: "", prodi2: "", kampus2: "", email: "", foto: "",
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (siswa) => {
    setFormData(siswa);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id, nama) => {
    const result = await Swal.fire({
      title: "Hapus Siswa?",
      text: `Yakin ingin menghapus ${nama}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/admin/siswa?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          Swal.fire("Terhapus!", "Data siswa berhasil dihapus.", "success");
          fetchSiswa();
        } else {
          throw new Error();
        }
      } catch {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editMode ? "PUT" : "POST";
      const res = await fetch("/api/admin/siswa", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire("Berhasil!", result.message, "success");
        setShowModal(false);
        fetchSiswa();
      } else {
        Swal.fire("Gagal!", result.error, "error");
      }
    } catch {
      Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
    }
  };

  // ─── Login Screen ──────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <Head><title>Admin Login - Data Siswa</title></Head>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  // ─── Main Screen ───────────────────────────────────────────────────────
  return (
    <>
      <Head><title>Data Siswa - Dashboard Admin</title></Head>

      <AdminLayout admin={admin} onLogout={handleLogout}>
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                👥 Data Siswa
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola data peserta SNBT Bimbel LB3R
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Siswa
            </button>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Cari</label>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Nama, NISN, Email, WA..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter Sekolah */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🏫 Sekolah</label>
              <select
                value={sekolah}
                onChange={(e) => handleSekolahFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Sekolah</option>
                {sekolahList.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">Total: {total} siswa</span>
            {search && <span className="text-blue-600">Filter: "{search}"</span>}
            {sekolah && <span className="text-emerald-600">Sekolah: {sekolah}</span>}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No
                    </th>
                    <SortableHeader label="Nama" field="nama" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
                    <SortableHeader label="NISN" field="nisn" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
                    <SortableHeader label="Sekolah" field="asalsekolah" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kontak
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Pilihan 1
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Pilihan 2
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {siswaList.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                        Tidak ada data siswa
                      </td>
                    </tr>
                  ) : (
                    siswaList.map((siswa, idx) => (
                      <tr key={siswa.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="font-medium text-gray-800">{siswa.nama}</div>
                          <div className="text-xs text-gray-500">{siswa.email}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                          {siswa.nisn}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {siswa.asalsekolah}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {siswa.wa}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="font-medium text-gray-800">{siswa.prodi1}</div>
                          <div className="text-xs text-gray-500">{siswa.kampus1}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="font-medium text-gray-800">{siswa.prodi2}</div>
                          <div className="text-xs text-gray-500">{siswa.kampus2}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(siswa)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(siswa.id, siswa.nama)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Hapus"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Halaman {page} dari {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ← Sebelumnya
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Selanjutnya →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Form */}
        {showModal && (
          <FormModal
            formData={formData}
            setFormData={setFormData}
            editMode={editMode}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
          />
        )}

      </AdminLayout>
    </>
  );
}

// ─── Sortable Header Component ─────────────────────────────────────────────
function SortableHeader({ label, field, sortBy, sortOrder, onSort }) {
  const active = sortBy === field;
  return (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {active && (
          <span className="text-blue-600">
            {sortOrder === "ASC" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </th>
  );
}

// ─── Form Modal Component ──────────────────────────────────────────────────
function FormModal({ formData, setFormData, editMode, onClose, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {editMode ? "✏️ Edit Siswa" : "➕ Tambah Siswa"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange} required />
            <InputField label="NISN" name="nisn" value={formData.nisn} onChange={handleChange} required />
            <InputField label="Asal Sekolah" name="asalsekolah" value={formData.asalsekolah} onChange={handleChange} required />
            <InputField label="WhatsApp" name="wa" value={formData.wa} onChange={handleChange} required placeholder="081234567890" />
            <InputField label="Email" name="email" value={formData.email} onChange={handleChange} required type="email" className="md:col-span-2" />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-700 mb-3">Pilihan Kampus & Prodi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Prodi Pilihan 1" name="prodi1" value={formData.prodi1} onChange={handleChange} />
              <InputField label="Kampus Pilihan 1" name="kampus1" value={formData.kampus1} onChange={handleChange} />
              <InputField label="Prodi Pilihan 2" name="prodi2" value={formData.prodi2} onChange={handleChange} />
              <InputField label="Kampus Pilihan 2" name="kampus2" value={formData.kampus2} onChange={handleChange} />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <InputField 
              label="URL Foto (opsional)" 
              name="foto" 
              value={formData.foto} 
              onChange={handleChange} 
              placeholder="https://example.com/foto.jpg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
            >
              {editMode ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Input Field Component ─────────────────────────────────────────────────
function InputField({ label, name, value, onChange, required, type = "text", placeholder, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}