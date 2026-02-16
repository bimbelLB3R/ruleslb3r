
// ============================================================
// components/hasil/TabJenisUjian.jsx
// ============================================================
export function TabJenisUjian({ aktif, onChange }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-300 w-fit">
      {["snbt", "tka"].map((j) => (
        <button
          key={j}
          onClick={() => onChange(j)}
          className={`px-6 py-2 text-sm font-semibold transition-colors ${
            aktif === j
              ? "bg-green-700 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {j.toUpperCase()}
        </button>
      ))}
    </div>
  );
}