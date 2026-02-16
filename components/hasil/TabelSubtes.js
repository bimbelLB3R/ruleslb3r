
// ============================================================
// components/hasil/TabelSubtes.jsx
// ============================================================
const WARNA_KATEGORI = {
  "Sangat Rendah": "bg-red-100 text-red-700",
  "Rendah":        "bg-orange-100 text-orange-700",
  "Cukup Rendah":  "bg-yellow-100 text-yellow-700",
  "Sedang":        "bg-gray-100 text-gray-600",
  "Cukup Tinggi":  "bg-blue-100 text-blue-700",
  "Tinggi":        "bg-green-100 text-green-700",
  "Sangat Tinggi": "bg-emerald-100 text-emerald-800",
};

export function TabelSubtes({ subtes }) {
  if (!subtes?.length) return null;

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <p className="font-semibold text-gray-700 px-4 pt-4 pb-2">Detail Per Subtes</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-2">Subtes</th>
              <th className="text-center px-3 py-2">Skor</th>
              <th className="text-center px-3 py-2">Benar</th>
              <th className="text-center px-3 py-2">Kategori</th>
              <th className="text-center px-3 py-2">Persentil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subtes.map((s) => (
              <tr key={s.subtesKey} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{s.label}</td>
                <td className="px-3 py-3 text-center font-bold text-gray-900">
                  {s.score?.toFixed(1) ?? "—"}
                </td>
                <td className="px-3 py-3 text-center text-gray-600">{s.totalBenar}</td>
                <td className="px-3 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${WARNA_KATEGORI[s.kategoriSiswa] ?? "bg-gray-100"}`}>
                    {s.kategoriSiswa}
                  </span>
                </td>
                <td className="px-3 py-3 text-center text-gray-600">
                  {s.persentil !== null
                    ? <span>Top <b>{100 - s.persentil}%</b></span>
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}