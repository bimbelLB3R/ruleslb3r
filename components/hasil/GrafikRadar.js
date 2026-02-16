
// ============================================================
// components/hasil/GrafikRadar.jsx
// ============================================================
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Tooltip, ResponsiveContainer
} from "recharts";

export function GrafikRadar({ subtes, jenis }) {
  if (!subtes?.length) return null;

  const data = subtes.map((s) => ({
    label: s.label.split(" ").slice(0, 2).join(" "), // potong label panjang
    score: s.score ?? 0,
  }));

  const warna = jenis === "snbt" ? "#15803d" : "#1d4ed8";

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <p className="font-semibold text-gray-700 mb-2">Profil Kemampuan per Subtes</p>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis domain={[200, 800]} tick={{ fontSize: 10 }} />
          <Radar dataKey="score" stroke={warna} fill={warna} fillOpacity={0.25} />
          <Tooltip formatter={(v) => v.toFixed(1)} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}   