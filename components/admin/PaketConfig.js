// components/admin/PaketConfig.jsx
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Daftar config yang bisa diatur
const CONFIG_LIST = [
  { key: "paket_snbt",    label: "SNBT",    icon: "🎓", color: "blue"    },
  { key: "paket_tka_sd",  label: "TKA SD",  icon: "🏫", color: "emerald" },
  { key: "paket_tka_smp", label: "TKA SMP", icon: "🏛️", color: "emerald" },
  { key: "paket_tka_sma", label: "TKA SMA", icon: "🎒", color: "emerald" },
];

const PAKET_OPTIONS = Array.from({ length: 10 }, (_, i) =>
  String(i + 1).padStart(2, "0")
); // ["01", "02", ..., "10"]

const COLOR = {
  blue:    { badge: "bg-blue-100 text-blue-700",       ring: "focus:ring-blue-400", btn: "bg-blue-600 hover:bg-blue-700" },
  emerald: { badge: "bg-emerald-100 text-emerald-700", ring: "focus:ring-emerald-400", btn: "bg-emerald-600 hover:bg-emerald-700" },
};

export default function PaketConfig({ admin }) {
  const [config, setConfig]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(null); // key yang sedang disimpan

  // ── Fetch config saat mount ──────────────────────────────────
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/config");
      const data = await res.json();
      if (res.ok) setConfig(data.config ?? {});
    } catch (err) {
      console.error("Fetch config error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Ubah paket aktif ─────────────────────────────────────────
  const handleSave = async (configKey, newVal) => {
    setSaving(configKey);
    try {
      const res  = await fetch("/api/admin/config", {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config_key:  configKey,
          config_val:  newVal,
          updated_by:  admin?.username ?? "admin",
        }),
      });
      const data = await res.json();

      if (res.ok) {
        // Update state lokal langsung tanpa refetch
        setConfig((prev) => ({
          ...prev,
          [configKey]: { ...prev[configKey], value: newVal },
        }));
        Swal.fire({
          title: "Berhasil!",
          text: data.message,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Gagal", data.error ?? "Terjadi kesalahan", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Terjadi kesalahan koneksi", "error");
    } finally {
      setSaving(null);
    }
  };

  const handleChange = (configKey, newVal) => {
    // Preview perubahan di UI dulu, baru konfirmasi
    Swal.fire({
      title: "Ubah Paket Aktif?",
      html: `Semua siswa akan mengerjakan <strong>Paket ${newVal}</strong> mulai sekarang.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor:  "#6b7280",
      confirmButtonText: "Ya, Ubah!",
      cancelButtonText:  "Batal",
    }).then((result) => {
      if (result.isConfirmed) handleSave(configKey, newVal);
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-gray-200 rounded w-1/3" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-800">🗂️ Paket Soal Aktif</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Paket yang dipilih akan digunakan oleh semua siswa saat login
          </p>
        </div>
        <button
          onClick={fetchConfig}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Grid config */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONFIG_LIST.map((cfg) => {
          const current   = config[cfg.key]?.value ?? "01";
          const updatedAt = config[cfg.key]?.updatedAt;
          const updatedBy = config[cfg.key]?.updatedBy;
          const scheme    = COLOR[cfg.color];
          const isSaving  = saving === cfg.key;

          return (
            <div
              key={cfg.key}
              className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3"
            >
              {/* Label ujian */}
              <div className="flex items-center gap-2">
                <span className="text-xl">{cfg.icon}</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">{cfg.label}</p>
                  {updatedAt && (
                    <p className="text-xs text-gray-400">
                      Diubah oleh <span className="font-medium">{updatedBy ?? "-"}</span>
                      {" · "}
                      {new Date(updatedAt).toLocaleDateString("id-ID", {
                        day: "2-digit", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>

              {/* Selector paket */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Paket aktif:</span>
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {PAKET_OPTIONS.map((p) => (
                    <button
                      key={p}
                      disabled={isSaving}
                      onClick={() => current !== p && handleChange(cfg.key, p)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold border-2 transition-all ${
                        current === p
                          ? `${scheme.btn} text-white border-transparent shadow-md scale-110`
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {isSaving && (
                  <svg className="w-4 h-4 animate-spin text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
              </div>

              {/* Badge paket aktif saat ini */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${scheme.badge}`}>
                  Aktif: Paket {current}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}