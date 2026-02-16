
// ============================================================
// components/hasil/KartuSkorTotal.jsx
// ============================================================
export function KartuSkorTotal({ skorTotal, jenis }) {
  if (!skorTotal) return null;

  const warna = jenis === "snbt" ? "from-green-700 to-green-900" : "from-blue-700 to-blue-900";

  return (
    <div className={`rounded-xl p-5 text-white bg-gradient-to-br ${warna} shadow`}>
      <p className="text-sm font-medium opacity-80 mb-1">Skor Total {jenis.toUpperCase()}</p>
      <p className="text-5xl font-extrabold">{skorTotal.skor_total?.toFixed(1) ?? "—"}</p>
      <div className="mt-3 flex gap-6 text-sm">
        <div>
          <p className="opacity-70">Ranking</p>
          <p className="font-bold text-lg">#{skorTotal.ranking ?? "—"}</p>
        </div>
        <div>
          <p className="opacity-70">Subtes Selesai</p>
          <p className="font-bold text-lg">{skorTotal.jumlah_subtes ?? "—"}</p>
        </div>
      </div>
    </div>
  );
}