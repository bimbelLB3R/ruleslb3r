// components/hasil/ProfilSiswa.jsx
// ============================================================
export function ProfilSiswa({ nama, nisn, foto }) {
  return (
    <div className="flex items-center gap-4">
      {foto && (
        <img src={foto} alt={nama} className="w-14 h-14 rounded-full border-2 border-white shadow" />
      )}
      <div>
        <p className="text-xl font-bold">{nama}</p>
        <p className="text-sm text-gray-300">NISN: {nisn}</p>
      </div>
    </div>
  );
}