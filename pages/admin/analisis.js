// pages/admin/analisis.jsx
import React, { useState, useEffect } from "react";
import Head from "next/head";
import AdminLayout from "../../components/admin/AdminLayout";
import LoginForm from "../../components/admin/LoginForm";

const PAKET_LIST = Array.from({ length: 10 }, (_, i) => String(i + 1).padStart(2, "0"));

export default function AnalisisPage() {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);

  // Selection
  const [jenis, setJenis] = useState("snbt");
  const [jenjang, setJenjang] = useState("sd");
  const [paket, setPaket] = useState("01");
  const [activeTab, setActiveTab] = useState("paket"); // 'paket' | 'siswa' | 'detail' | 'jawaban'

  // Data
  const [dataPaket, setDataPaket] = useState(null);
  const [dataHasil, setDataHasil] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [dataJawaban, setDataJawaban] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination & Filter untuk tab detail
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("ranking");
  const [sortOrder, setSortOrder] = useState("ASC");

  // Filter untuk tab jawaban
  const [selectedNisn, setSelectedNisn] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");

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
      if (activeTab === "paket") fetchPaketSoal();
      if (activeTab === "siswa") fetchHasilSiswa();
      if (activeTab === "detail") fetchDetailSiswa();
      if (activeTab === "jawaban" && selectedNisn && selectedKategori) fetchJawabanSiswa();
    }
  }, [isLoggedIn, jenis, jenjang, paket, activeTab, page, search, sortBy, sortOrder, selectedNisn, selectedKategori]);

  const fetchPaketSoal = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ jenis, paket });
      if (jenis === "tka") params.append("jenjang", jenjang);

      const res = await fetch(`/api/admin/analisis/paket-soal?${params}`);
      const data = await res.json();
      if (res.ok) setDataPaket(data);
    } catch (error) {
      console.error("Fetch paket soal error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHasilSiswa = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ jenis, paket });
      if (jenis === "tka") params.append("jenjang", jenjang);

      const res = await fetch(`/api/admin/analisis/hasil-siswa?${params}`);
      const data = await res.json();
      if (res.ok) setDataHasil(data);
    } catch (error) {
      console.error("Fetch hasil siswa error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailSiswa = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        jenis,
        paket,
        page: String(page),
        limit: String(limit),
        search,
        sortBy,
        sortOrder,
      });
      if (jenis === "tka") params.append("jenjang", jenjang);

      const res = await fetch(`/api/admin/analisis/detail-siswa?${params}`);
      const data = await res.json();
      if (res.ok) {
        setDataDetail(data.data);
        setTotal(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Fetch detail siswa error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJawabanSiswa = async () => {
  setLoading(true);
  setDataJawaban(null); // 🔥 WAJIB RESET

  try {
    const res = await fetch(
      `/api/admin/analisis/jawaban-siswa?kategori=${selectedKategori}&nisn=${selectedNisn}`
    );

    if (!res.ok) {
      setDataJawaban(null);
      return;
    }

    const data = await res.json();
    setDataJawaban(data);

  } catch (error) {
    console.error("Fetch jawaban siswa error:", error);
    setDataJawaban(null);
  } finally {
    setLoading(false);
  }
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

  const handleJenisChange = (val) => {
    setJenis(val);
    setDataPaket(null);
    setDataHasil(null);
  };

  const handleJenjangChange = (val) => {
    setJenjang(val);
    setDataPaket(null);
    setDataHasil(null);
  };

  const handlePaketChange = (val) => {
    setPaket(val);
    setDataPaket(null);
    setDataHasil(null);
    setDataDetail(null);
    setPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
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
    setSortBy("ranking");
    setSortOrder("ASC");
    setPage(1);
  };

  // ─── Login Screen ──────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <Head><title>Admin Login - Analisis IRT</title></Head>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  // ─── Main Screen ───────────────────────────────────────────────────────
  const isSnbt = jenis === "snbt";
  const activeColor = isSnbt ? "blue" : "emerald";

  return (
    <>
      <Head><title>Analisis IRT - Dashboard Admin</title></Head>

      <AdminLayout admin={admin} onLogout={handleLogout}>
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                📊 Analisis IRT
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Analisis Item Response Theory untuk soal dan hasil siswa
              </p>
            </div>
          </div>
        </div>

        {/* Selector Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Jenis Ujian */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Ujian</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleJenisChange("snbt")}
                  className={`px-4 py-2.5 rounded-lg font-semibold transition ${
                    isSnbt
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  🎓 SNBT
                </button>
                <button
                  onClick={() => handleJenisChange("tka")}
                  className={`px-4 py-2.5 rounded-lg font-semibold transition ${
                    !isSnbt
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  📚 TKA
                </button>
              </div>
            </div>

            {/* Jenjang (TKA) */}
            {!isSnbt && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenjang</label>
                <select
                  value={jenjang}
                  onChange={(e) => handleJenjangChange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="sd">🏫 SD</option>
                  <option value="smp">🏛️ SMP</option>
                  <option value="sma">🏫 SMA</option>
                </select>
              </div>
            )}

            {/* Paket */}
            <div className={!isSnbt ? "" : "md:col-span-2"}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paket Soal</label>
              <div className="flex flex-wrap gap-2">
                {PAKET_LIST.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePaketChange(p)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition ${
                      paket === p
                        ? isSnbt
                          ? "bg-blue-600 text-white border-transparent"
                          : "bg-emerald-600 text-white border-transparent"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            <button
              onClick={() => setActiveTab("paket")}
              className={`px-6 py-3.5 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === "paket"
                  ? isSnbt
                    ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                    : "border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              📝 Analisis Paket Soal
            </button>
            <button
              onClick={() => setActiveTab("siswa")}
              className={`px-6 py-3.5 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === "siswa"
                  ? isSnbt
                    ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                    : "border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              👥 Analisis Hasil Siswa
            </button>
            <button
              onClick={() => setActiveTab("detail")}
              className={`px-6 py-3.5 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === "detail"
                  ? isSnbt
                    ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                    : "border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              📊 Detail Skor Siswa
            </button>
            <button
              onClick={() => setActiveTab("jawaban")}
              className={`px-6 py-3.5 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === "jawaban"
                  ? isSnbt
                    ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                    : "border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              🔍 Analisis Jawaban
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-gray-100">
            <div className="text-center">
              <div className={`animate-spin rounded-full h-12 w-12 border-4 border-gray-300 mx-auto mb-4 ${
                isSnbt ? "border-t-blue-600" : "border-t-emerald-600"
              }`} />
              <p className="text-gray-500">Memuat data analisis...</p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "paket" && <PaketSoalTab data={dataPaket} colorClass={activeColor} />}
            {activeTab === "siswa" && <HasilSiswaTab data={dataHasil} colorClass={activeColor} />}
            {activeTab === "detail" && (
              <DetailSiswaTab
                data={dataDetail}
                colorClass={activeColor}
                page={page}
                totalPages={totalPages}
                total={total}
                limit={limit}
                search={search}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onPageChange={setPage}
                onSearch={handleSearch}
                onSort={handleSort}
                onReset={handleReset}
              />
            )}
            {activeTab === "jawaban" && (
              <JawabanSiswaTab
                data={dataJawaban}
                dataDetail={dataDetail}
                jenis={jenis}
                jenjang={jenjang}
                paket={paket}
                colorClass={activeColor}
                selectedNisn={selectedNisn}
                selectedKategori={selectedKategori}
                onSelectSiswa={(nisn, kategori) => {
                  setSelectedNisn(nisn);
                  setSelectedKategori(kategori);
                }}
              />
            )}
          </>
        )}

      </AdminLayout>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 1: ANALISIS PAKET SOAL
// ═══════════════════════════════════════════════════════════════════════════

function PaketSoalTab({ data, colorClass }) {
  if (!data || !data.subtes || data.subtes.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">Belum ada analisis IRT untuk paket ini</p>
        <p className="text-sm text-gray-400 mt-2">Jalankan script analisis_irt.py terlebih dahulu</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.subtes.map((subtes, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className={`px-6 py-4 ${colorClass === "blue" ? "bg-blue-50 border-b border-blue-100" : "bg-emerald-50 border-b border-emerald-100"}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{subtes.kategori}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Model: <span className="font-semibold">{subtes.model_irt}</span> · 
                  Jumlah Soal: <span className="font-semibold">{subtes.stats.total_soal}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Parameter Kesulitan (b)</p>
                <p className="text-2xl font-bold text-gray-800">
                  {subtes.stats.rata_b.toFixed(2)}
                  <span className="text-sm font-normal text-gray-500 ml-2">± {subtes.stats.std_b.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                label="Rata-rata b"
                value={subtes.stats.rata_b.toFixed(3)}
                subtitle="Kesulitan soal"
                color={colorClass}
              />
              <StatCard
                label="Std Deviasi b"
                value={subtes.stats.std_b.toFixed(3)}
                subtitle="Variasi kesulitan"
                color={colorClass}
              />
              {subtes.stats.rata_a && (
                <StatCard
                  label="Rata-rata a"
                  value={subtes.stats.rata_a.toFixed(3)}
                  subtitle="Daya beda (2PL)"
                  color={colorClass}
                />
              )}
              <StatCard
                label="Total Soal"
                value={subtes.stats.total_soal}
                subtitle="Teranalisis"
                color={colorClass}
              />
            </div>

            {/* Distribusi Kesulitan */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Distribusi Kategori Kesulitan</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(subtes.stats.distribusi_kesulitan).map(([kat, jml]) => (
                  <div key={kat} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">{kat}</p>
                    <p className="text-xl font-bold text-gray-800">{jml}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 2: ANALISIS HASIL SISWA
// ═══════════════════════════════════════════════════════════════════════════

function HasilSiswaTab({ data, colorClass }) {
  if (!data || data.stats_total.jumlah_siswa === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">Belum ada siswa yang mengerjakan paket ini</p>
        <p className="text-sm text-gray-400 mt-2">Atau belum dianalisis IRT</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Stats Total */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4">📊 Statistik Skor Total</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard
            label="Jumlah Siswa"
            value={data.stats_total.jumlah_siswa}
            subtitle="Peserta"
            color={colorClass}
          />
          <StatCard
            label="Rata-rata"
            value={data.stats_total.rata_skor.toFixed(1)}
            subtitle="Skor total"
            color={colorClass}
          />
          <StatCard
            label="Std Deviasi"
            value={data.stats_total.std_skor.toFixed(1)}
            subtitle="Sebaran"
            color={colorClass}
          />
          <StatCard
            label="Skor Min"
            value={data.stats_total.skor_min.toFixed(1)}
            subtitle="Terendah"
            color="red"
          />
          <StatCard
            label="Skor Max"
            value={data.stats_total.skor_max.toFixed(1)}
            subtitle="Tertinggi"
            color="green"
          />
        </div>
      </div>

      {/* Distribusi Kategori */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4">📈 Distribusi Kategori Siswa</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(data.distribusi_kategori).map(([kat, jml]) => (
            <div key={kat} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">{kat}</p>
              <p className="text-2xl font-bold text-gray-800">{jml}</p>
              <p className="text-xs text-gray-500 mt-1">
                ({((jml / data.stats_total.jumlah_siswa) * 100).toFixed(1)}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skor Per Subtes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4">📝 Skor Per Subtes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Subtes</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Siswa</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Rata-rata Skor</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Std Dev</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Min</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Max</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Rata Benar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.stats_subtes.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.kategori}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{row.jumlah_siswa}</td>
                  <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">{row.rata_skor}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">{row.std_skor}</td>
                  <td className="px-4 py-3 text-sm text-center text-red-600">{row.skor_min}</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600">{row.skor_max}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{row.rata_benar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 10 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4">🏆 Top 10 Siswa</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">NISN</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Nama</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Skor Total</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Subtes Selesai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.top_10.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      idx === 0 ? "bg-yellow-100 text-yellow-700" :
                      idx === 1 ? "bg-gray-200 text-gray-700" :
                      idx === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-700">{row.nisn}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.nama}</td>
                  <td className="px-4 py-3 text-center text-lg font-bold text-gray-800">{row.skor_total.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">{row.jumlah_subtes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 3: DETAIL SKOR SISWA
// ═══════════════════════════════════════════════════════════════════════════

function DetailSiswaTab({
  data,
  colorClass,
  page,
  totalPages,
  total,
  limit,
  search,
  sortBy,
  sortOrder,
  onPageChange,
  onSearch,
  onSort,
  onReset,
}) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">Belum ada data siswa untuk paket ini</p>
        <p className="text-sm text-gray-400 mt-2">Atau belum ada yang mengerjakan</p>
      </div>
    );
  }

  // Get unique subtes untuk header kolom
  const allSubtes = new Set();
  data.forEach((siswa) => {
    siswa.detail_subtes.forEach((s) => allSubtes.add(s.kategori));
  });
  const subtesColumns = Array.from(allSubtes).sort();

  return (
    <div className="space-y-6">
      
      {/* Filter & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="🔍 Cari nama atau NISN..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Stats & Reset */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Total: <span className="font-bold">{total}</span> siswa
            </span>
            {search && (
              <button
                onClick={onReset}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  No
                </th>
                <SortableHeader
                  label="Ranking"
                  field="ranking"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={onSort}
                  className="sticky left-12 bg-gray-50 z-10"
                />
                <SortableHeader
                  label="NISN"
                  field="nisn"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={onSort}
                  className="sticky left-24 bg-gray-50 z-10"
                />
                <SortableHeader
                  label="Nama"
                  field="nama"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={onSort}
                  className="sticky left-36 bg-gray-50 z-10"
                />
                <SortableHeader
                  label="Skor Total"
                  field="skor_total"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={onSort}
                />
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subtes Selesai
                </th>
                
                {/* Kolom per subtes */}
                {subtesColumns.map((subtes) => (
                  <th
                    key={subtes}
                    className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-l border-gray-200"
                    colSpan="2"
                  >
                    {subtes.split("_").slice(-2, -1).join("_").toUpperCase()}
                  </th>
                ))}
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th colSpan="6"></th>
                {subtesColumns.map((subtes) => (
                  <React.Fragment key={subtes}>
                    <th className="px-2 py-2 text-xs text-gray-500 border-l border-gray-200">Skor</th>
                    <th className="px-2 py-2 text-xs text-gray-500">Benar</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((siswa, idx) => (
                <tr key={siswa.nisn} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-600 sticky left-0 bg-white">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-3 text-center sticky left-12 bg-white">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      siswa.ranking === 1 ? "bg-yellow-100 text-yellow-700" :
                      siswa.ranking === 2 ? "bg-gray-200 text-gray-700" :
                      siswa.ranking === 3 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {siswa.ranking}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-700 sticky left-24 bg-white">
                    {siswa.nisn}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 sticky left-36 bg-white">
                    {siswa.nama}
                  </td>
                  <td className="px-4 py-3 text-center text-lg font-bold text-gray-800">
                    {siswa.skor_total}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {siswa.subtes_selesai} / {siswa.jumlah_subtes}
                  </td>

                  {/* Data per subtes */}
                  {subtesColumns.map((subtes) => {
                    const detail = siswa.detail_subtes.find((s) => s.kategori === subtes);
                    return (
                      <React.Fragment key={subtes}>
                        <td className="px-2 py-3 text-center text-sm font-semibold text-gray-800 border-l border-gray-200">
                          {detail ? detail.skor : "—"}
                        </td>
                        <td className="px-2 py-3 text-center text-sm text-gray-600">
                          {detail ? detail.benar : "—"}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Halaman {page} dari {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onPageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ← Sebelumnya
              </button>
              <button
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 4: ANALISIS JAWABAN SISWA
// ═══════════════════════════════════════════════════════════════════════════

function JawabanSiswaTab({
  data,
  dataDetail,
  jenis,
  jenjang,
  paket,
  colorClass,
  selectedNisn,
  selectedKategori,
  onSelectSiswa,
}) {
  const [siswaList, setSiswaList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);

  useEffect(() => {
  if (!selectedNisn || !dataDetail) return;

  const siswa = dataDetail.find((s) => s.nisn === selectedNisn);
  if (!siswa) {
    setKategoriList([]);
    return;
  }

  const kategori = siswa.detail_subtes.map((sub) => sub.kategori);
  setKategoriList(kategori);

}, [selectedNisn, dataDetail]);

  // Extract list siswa dan kategori dari dataDetail
  useEffect(() => {
    if (!dataDetail || dataDetail.length === 0) return;

    // Unique siswa
    const uniqueSiswa = [];
    const seenNisn = new Set();
    dataDetail.forEach((s) => {
      if (!seenNisn.has(s.nisn)) {
        uniqueSiswa.push({ nisn: s.nisn, nama: s.nama });
        seenNisn.add(s.nisn);
      }
    });
    setSiswaList(uniqueSiswa);

    // Unique kategori from detail_subtes
   


    // Auto-select first siswa & kategori if not selected
    // if (!selectedNisn && uniqueSiswa.length > 0) {
    //   const firstSiswa = uniqueSiswa[0];
    //   const firstKategori = Array.from(uniqueKategori).sort()[0];
    //   onSelectSiswa(firstSiswa.nisn, firstKategori);
    // }
  }, [dataDetail]);

  if (!dataDetail || dataDetail.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">Belum ada data siswa untuk paket ini</p>
        <p className="text-sm text-gray-400 mt-2">Silakan ke tab "Detail Skor Siswa" terlebih dahulu</p>
      </div>
    );
  }

  const subtesLabel = selectedKategori ? 
    selectedKategori.split("_").slice(jenis === "snbt" ? 1 : 2, -1).join("_").toUpperCase() : 
    "";

  return (
    <div className="space-y-6">
      
      {/* Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pilih Siswa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">👤 Pilih Siswa</label>
            <select
              value={selectedNisn}
              onChange={(e) => {
  const nisn = e.target.value;

  const siswa = dataDetail.find(s => s.nisn === nisn);
  const firstKategori = siswa?.detail_subtes?.[0]?.kategori || "";

  onSelectSiswa(nisn, firstKategori);
}}

              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Siswa --</option>
              {siswaList.map((s) => (
                <option key={s.nisn} value={s.nisn}>
                  {s.nisn} - {s.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Pilih Subtes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📝 Pilih Subtes</label>
            <select
              value={selectedKategori}
              onChange={(e) => {
                const kategori = e.target.value;
                onSelectSiswa(selectedNisn, kategori);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Subtes --</option>
              {kategoriList.map((kat) => (
                <option key={kat} value={kat}>
                  {kat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hasil Analisis */}
      {data ? (
        <>
          {/* Header Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{data.nama}</h3>
                <p className="text-sm text-gray-600">NISN: {data.nisn} · {subtesLabel}</p>
              </div>
              {data.skor_irt && (
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">{data.skor_irt.score}</p>
                  <p className="text-xs text-gray-500">{data.skor_irt.kategori}</p>
                </div>
              )}
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard label="Total Soal" value={data.statistik.total_soal} subtitle="Soal" color={colorClass} />
              <StatCard label="Benar" value={data.statistik.benar} subtitle={`${data.statistik.persentase_benar}%`} color="green" />
              <StatCard label="Salah" value={data.statistik.salah} subtitle="Jawaban" color="red" />
              <StatCard label="Kosong" value={data.statistik.kosong} subtitle="Tidak dijawab" color="gray" />
              {data.skor_irt && (
                <StatCard label="Theta (F1)" value={data.skor_irt.F1} subtitle="IRT ability" color={colorClass} />
              )}
            </div>
          </div>

          {/* Tabel Detail Soal */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">No</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Jawaban</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Kunci</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Kesulitan (b)</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Kategori Soal</th>
                    {data.detail_soal[0]?.a !== null && (
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Daya Beda (a)</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.detail_soal.map((soal) => (
                    <tr 
                      key={soal.nomor_soal} 
                      className={`hover:bg-gray-50 ${
                        soal.status === "benar" ? "bg-green-50" :
                        soal.status === "salah" ? "bg-red-50" :
                        ""
                      }`}
                    >
                      <td className="px-4 py-3 text-center font-semibold text-gray-800">
                        {soal.nomor_soal}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {soal.status === "benar" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ Benar
                          </span>
                        )}
                        {soal.status === "salah" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            ✗ Salah
                          </span>
                        )}
                        {soal.status === "kosong" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            — Kosong
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-gray-800">
                        {soal.jawaban_siswa}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-green-700">
                        {soal.kunci_jawaban}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">
                        {soal.b}
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-gray-600">
                        {soal.kategori_soal}
                      </td>
                      {soal.a !== null && (
                        <td className="px-4 py-3 text-center text-sm text-gray-700">
                          {soal.a}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Catatan Interpretasi */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h4 className="font-semibold text-blue-900 mb-2">📌 Interpretasi Parameter IRT</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>Kesulitan (b):</strong> Nilai tinggi = soal sulit. Rentang -2 (sangat mudah) hingga +2 (sangat sulit)</li>
              <li><strong>Daya Beda (a):</strong> Nilai tinggi = soal membedakan siswa pandai vs kurang. Minimal 0.5 untuk soal baik</li>
              <li><strong>Theta (F1):</strong> Kemampuan siswa. Nilai tinggi = kemampuan tinggi</li>
              <li><strong>Skor 200-800:</strong> Transformasi theta ke skala standar (rata-rata 500, std dev 100)</li>
            </ul>
          </div>
        </>
      ) : (
        selectedNisn && selectedKategori && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-gray-500">Memuat data jawaban siswa...</p>
          </div>
        )
      )}

    </div>
  );
}

// ─── Sortable Header Component ─────────────────────────────────────────────
function SortableHeader({ label, field, sortBy, sortOrder, onSort, className = "" }) {
  const active = sortBy === field;
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition ${className}`}
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

// ═══════════════════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function StatCard({ label, value, subtitle, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    green: "bg-green-50 text-green-700",
    gray: "bg-gray-50 text-gray-700",
  };

  return (
    <div className={`rounded-lg p-4 ${colorMap[color] || colorMap.blue}`}>
      <p className="text-xs opacity-80 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs opacity-60 mt-1">{subtitle}</p>
    </div>
  );
}