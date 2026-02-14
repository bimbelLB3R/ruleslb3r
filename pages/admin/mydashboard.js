import { useState, useEffect } from "react";
import Head from "next/head";
import LoginForm from "../../components/admin/LoginForm";
import AdminLayout from "../../components/admin/AdminLayout";
import MySoalList from "../../components/admin/MySoalList";
import MySoalForm from "../../components/admin/MySoalForm";
import PaketConfig from "../../components/admin/PaketConfig";

// ─── Konfigurasi Ujian ────────────────────────────────────────────────────────

const UJIAN_CONFIG = {
  snbt: {
    label: "SNBT",
    icon: "🎓",
    color: "blue",
    jenjang: null, // SNBT tidak ada jenjang
    subtes: [
      { value: "pu", label: "Penalaran Umum", quota: 30 },
      { value: "ppu", label: "Pengetahuan & Pemahaman Umum", quota: 20 },
      { value: "pbm", label: "Pemahaman Bacaan & Menulis", quota: 20 },
      { value: "pk", label: "Pengetahuan Kuantitatif", quota: 20 },
      { value: "lbe", label: "Literasi Bahasa Inggris", quota: 20 },
      { value: "lbi", label: "Literasi Bahasa Indonesia", quota: 30 },
      { value: "pm", label: "Penalaran Matematika", quota: 20 },
    ],
  },
  tka: {
    label: "TKA",
    icon: "📚",
    color: "emerald",
    jenjang: {
      sd: {
        label: "SD",
        icon: "🏫",
        subtes: [
          { value: "matematika", label: "Matematika", quota: 30 },
          { value: "ipa", label: "IPA", quota: 25 },
          { value: "b_indonesia", label: "Bahasa Indonesia", quota: 25 },
          { value: "ips", label: "IPS", quota: 20 },
        ],
      },
      smp: {
        label: "SMP",
        icon: "🏛️",
        subtes: [
          { value: "matematika", label: "Matematika", quota: 35 },
          { value: "ipa", label: "IPA", quota: 30 },
          { value: "b_indonesia", label: "Bahasa Indonesia", quota: 25 },
          { value: "b_inggris", label: "Bahasa Inggris", quota: 25 },
          { value: "ips", label: "IPS", quota: 25 },
        ],
      },
      sma: {
        label: "SMA",
        icon: "🏫",
        subtes: [
          { value: "matematika", label: "Matematika", quota: 40 },
          { value: "fisika", label: "Fisika", quota: 30 },
          { value: "kimia", label: "Kimia", quota: 30 },
          { value: "biologi", label: "Biologi", quota: 30 },
          { value: "b_indonesia", label: "Bahasa Indonesia", quota: 30 },
          { value: "b_inggris", label: "Bahasa Inggris", quota: 30 },
          { value: "ekonomi", label: "Ekonomi", quota: 30 },
          { value: "geografi", label: "Geografi", quota: 30 },
          { value: "sejarah", label: "Sejarah", quota: 30 },
          { value: "sosiologi", label: "Sosiologi", quota: 30 },
        ],
      },
    },
  },
};

// ─── Generate Paket List ──────────────────────────────────────────────────────

const generatePaketList = (count = 10) =>
  Array.from({ length: count }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: `Paket ${String(i + 1).padStart(2, "0")}`,
  }));

const PAKET_LIST = generatePaketList(10);

// ─── Color Map ────────────────────────────────────────────────────────────────

const COLOR = {
  blue: {
    bg: "bg-blue-600",
    bgLight: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-600",
    ring: "focus:ring-blue-500",
    badge: "bg-blue-100 text-blue-700",
    tab: "border-b-2 border-blue-600 text-blue-600",
  },
  emerald: {
    bg: "bg-emerald-600",
    bgLight: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-600",
    ring: "focus:ring-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    tab: "border-b-2 border-emerald-600 text-emerald-600",
  },
};

// ─── Komponen: Breadcrumb ─────────────────────────────────────────────────────

function Breadcrumb({ jenisUjian, jenjang, paket, subtes }) {
  const cfg = UJIAN_CONFIG[jenisUjian];
  const subtesLabel =
    jenisUjian === "snbt"
      ? cfg.subtes.find((s) => s.value === subtes)?.label
      : cfg.jenjang[jenjang]?.subtes.find((s) => s.value === subtes)?.label;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
      <span className="font-medium text-gray-700">{cfg.label}</span>
      {jenjang && (
        <>
          <span>›</span>
          <span className="font-medium text-gray-700">
            {cfg.jenjang[jenjang]?.label}
          </span>
        </>
      )}
      {paket && (
        <>
          <span>›</span>
          <span className="font-medium text-gray-700">Paket {paket}</span>
        </>
      )}
      {subtesLabel && (
        <>
          <span>›</span>
          <span className="font-medium text-gray-700">{subtesLabel}</span>
        </>
      )}
    </div>
  );
}

// ─── Komponen: Step Badge ─────────────────────────────────────────────────────

function StepBadge({ number, label, active, done, color = "blue" }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
          done
            ? "bg-green-500 text-white"
            : active
            ? `${COLOR[color].bg} text-white shadow-md`
            : "bg-gray-200 text-gray-400"
        }`}
      >
        {done ? "✓" : number}
      </div>
      <span
        className={`text-sm font-medium ${
          active ? "text-gray-800" : done ? "text-green-600" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Komponen: SelectorCard ───────────────────────────────────────────────────

function SelectorCard({ icon, label, sublabel, selected, onClick, colorClass }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
        selected
          ? `${colorClass} shadow-md scale-[1.02]`
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <p className={`font-bold mt-1 ${selected ? "" : "text-gray-800"}`}>{label}</p>
      {sublabel && (
        <p className={`text-xs mt-0.5 ${selected ? "opacity-80" : "text-gray-500"}`}>
          {sublabel}
        </p>
      )}
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white bg-opacity-90 flex items-center justify-center text-xs">
          ✓
        </span>
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);

  // Seleksi Ujian — Step 1
  const [jenisUjian, setJenisUjian] = useState("snbt"); // "snbt" | "tka"

  // Seleksi Jenjang — Step 2 (hanya TKA)
  const [jenjang, setJenjang] = useState("sd"); // "sd" | "smp" | "sma"

  // Seleksi Paket — Step 3
  const [paket, setPaket] = useState("01");

  // Seleksi Subtes — Step 4
  const [subtes, setSubtes] = useState("pu");

  // Tab & Form
  const [activeTab, setActiveTab] = useState("list");
  const [editData, setEditData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Stats
  const [totalSoal, setTotalSoal] = useState(0);
  const [loadingStats, setLoadingStats] = useState(false);

  // ─── Derived ────────────────────────────────────────────────────────────────

  const cfgUjian = UJIAN_CONFIG[jenisUjian];
  const activeColor = COLOR[cfgUjian.color];
  const isSnbt = jenisUjian === "snbt";
  const subtesOptions = isSnbt
    ? cfgUjian.subtes
    : cfgUjian.jenjang[jenjang]?.subtes ?? [];

  // Slug kategori untuk API: contoh "snbt_pu_01" atau "tka_smp_matematika_01"
  const buildKategoriSlug = () =>
    isSnbt
      ? `snbt_${subtes}_${paket}`
      : `tka_${jenjang}_${subtes}_${paket}`;

  const kategoriSlug = buildKategoriSlug();

  const currentSubtesConfig = subtesOptions.find((s) => s.value === subtes);

  // ─── Effects ────────────────────────────────────────────────────────────────

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

  // Reset subtes saat jenis/jenjang berubah agar tidak invalid
  useEffect(() => {
    const opts = isSnbt
      ? UJIAN_CONFIG.snbt.subtes
      : UJIAN_CONFIG.tka.jenjang[jenjang]?.subtes ?? [];
    if (opts.length > 0 && !opts.find((s) => s.value === subtes)) {
      setSubtes(opts[0].value);
    }
  }, [jenisUjian, jenjang]);

  useEffect(() => {
    if (isLoggedIn) fetchTotalSoal();
  }, [kategoriSlug, isLoggedIn, refreshTrigger]);

  // ─── API ─────────────────────────────────────────────────────────────────────

  const fetchTotalSoal = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch(`/api/admin/soal/stats?kategori=${kategoriSlug}`);
      const data = await res.json();
      setTotalSoal(res.ok ? data.total : 0);
    } catch {
      setTotalSoal(0);
    } finally {
      setLoadingStats(false);
    }
  };

  // ─── Handlers ────────────────────────────────────────────────────────────────

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
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleCancelForm = () => {
    setActiveTab("list");
    setEditData(null);
  };

  const handleCreateNew = () => {
    setEditData(null);
    setActiveTab("create");
  };

  const handleJenisUjianChange = (val) => {
    setJenisUjian(val);
    setActiveTab("list");
    setEditData(null);
  };

  const handleJenjangChange = (val) => {
    setJenjang(val);
    setActiveTab("list");
    setEditData(null);
  };

  const handlePaketChange = (val) => {
    setPaket(val);
    setActiveTab("list");
    setEditData(null);
  };

  const handleSubtesChange = (val) => {
    setSubtes(val);
    setActiveTab("list");
    setEditData(null);
  };

  // ─── Login ───────────────────────────────────────────────────────────────────

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

  // ─── Dashboard ───────────────────────────────────────────────────────────────

  return (
    <>
      <Head>
        <title>Dashboard Admin - LB3R</title>
      </Head>

      <AdminLayout admin={admin} onLogout={handleLogout}>

        {/* ── Panel Paket Aktif ──────────────────────────────────────────── */}
        <PaketConfig admin={admin} />

        {/* ── Panel Konfigurasi Soal ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden">

          {/* Header Panel */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-800">⚙️ Konfigurasi Soal</h2>
              <Breadcrumb
                jenisUjian={jenisUjian}
                jenjang={isSnbt ? null : jenjang}
                paket={paket}
                subtes={subtes}
              />
            </div>
            {/* Stats Chip */}
            <div className="flex gap-3">
              <div className={`${activeColor.bgLight} px-4 py-2 rounded-xl text-center min-w-[80px]`}>
                <p className="text-xs text-gray-500 font-medium">Tersimpan</p>
                {loadingStats ? (
                  <div className={`mx-auto mt-1 animate-spin rounded-full h-5 w-5 border-2 border-transparent ${activeColor.border} border-t-current`} />
                ) : (
                  <p className={`text-xl font-extrabold ${activeColor.text}`}>{totalSoal}</p>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-2 rounded-xl text-center min-w-[80px]">
                <p className="text-xs text-gray-500 font-medium">Kuota</p>
                <p className="text-xl font-extrabold text-gray-700">
                  {currentSubtesConfig?.quota ?? "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">

            {/* ── STEP 1: Jenis Ujian ──────────────────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <StepBadge number="1" label="Jenis Ujian" active={true} done={false} color={cfgUjian.color} />
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <SelectorCard
                  icon="🎓"
                  label="SNBT"
                  sublabel="Seleksi Nasional Berbasis Tes"
                  selected={jenisUjian === "snbt"}
                  onClick={() => handleJenisUjianChange("snbt")}
                  colorClass="border-blue-500 bg-blue-50 text-blue-800"
                />
                <SelectorCard
                  icon="📚"
                  label="TKA"
                  sublabel="Tes Kemampuan Akademik"
                  selected={jenisUjian === "tka"}
                  onClick={() => handleJenisUjianChange("tka")}
                  colorClass="border-emerald-500 bg-emerald-50 text-emerald-800"
                />
              </div>
            </div>

            {/* ── STEP 2: Jenjang (hanya TKA) ─────────────────────────────── */}
            {!isSnbt && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <StepBadge number="2" label="Jenjang" active={true} done={false} color="emerald" />
                </div>
                <div className="grid grid-cols-3 gap-3 max-w-sm">
                  {Object.entries(UJIAN_CONFIG.tka.jenjang).map(([key, val]) => (
                    <SelectorCard
                      key={key}
                      icon={val.icon}
                      label={val.label}
                      selected={jenjang === key}
                      onClick={() => handleJenjangChange(key)}
                      colorClass="border-emerald-500 bg-emerald-50 text-emerald-800"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 3: Paket ────────────────────────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <StepBadge
                  number={isSnbt ? "2" : "3"}
                  label="Paket Soal"
                  active={true}
                  done={false}
                  color={cfgUjian.color}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {PAKET_LIST.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => handlePaketChange(p.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-150 ${
                      paket === p.value
                        ? `${activeColor.bg} text-white border-transparent shadow-md`
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── STEP 4: Sub-Tes ──────────────────────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <StepBadge
                  number={isSnbt ? "3" : "4"}
                  label="Sub-Tes / Mata Pelajaran"
                  active={true}
                  done={false}
                  color={cfgUjian.color}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {subtesOptions.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => handleSubtesChange(s.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-150 flex items-center gap-2 ${
                      subtes === s.value
                        ? `${activeColor.bg} text-white border-transparent shadow-md`
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {s.label}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                        subtes === s.value
                          ? "bg-white bg-opacity-25 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {s.quota}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Tab Navigasi ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-100">
            <button
              className={`px-6 py-3.5 font-medium text-sm transition-all ${
                activeTab === "list"
                  ? `${activeColor.tab} bg-gray-50`
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab("list");
                setEditData(null);
              }}
            >
              📋 Daftar Soal
            </button>
            <button
              className={`px-6 py-3.5 font-medium text-sm transition-all ${
                activeTab === "create"
                  ? `${activeColor.tab} bg-gray-50`
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
              onClick={handleCreateNew}
            >
              ➕ Tambah Soal
            </button>
            {activeTab === "edit" && (
              <button
                className="px-6 py-3.5 font-medium text-sm border-b-2 border-yellow-500 text-yellow-600 bg-yellow-50 cursor-default"
                disabled
              >
                ✏️ Edit Soal
              </button>
            )}

            {/* Info konteks di kanan */}
            <div className="ml-auto flex items-center gap-2 px-4">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${activeColor.badge}`}
              >
                {cfgUjian.icon} {cfgUjian.label}
                {!isSnbt && ` ${UJIAN_CONFIG.tka.jenjang[jenjang]?.label}`}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                Paket {paket}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                {currentSubtesConfig?.label}
              </span>
            </div>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────────────────── */}
        {activeTab === "list" && (
          <MySoalList
            kategori={kategoriSlug}
            onEdit={handleEdit}
            refreshTrigger={refreshTrigger}
          />
        )}

        {(activeTab === "create" || activeTab === "edit") && (
          <MySoalForm
            kategori={kategoriSlug}
            editData={editData}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelForm}
          />
        )}

      </AdminLayout>
    </>
  );
}