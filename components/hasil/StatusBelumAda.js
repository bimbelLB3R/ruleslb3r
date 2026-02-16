
// ============================================================
// components/hasil/StatusBelumAda.jsx
// ============================================================
export function StatusBelumAda({ tipe, email, jenis }) {
  if (tipe === "tidak-terdaftar") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center px-4">
        <p className="text-4xl">🔍</p>
        <p className="text-gray-700 font-semibold text-lg">Email tidak terdaftar</p>
        <p className="text-gray-500 text-sm">
          {email} belum terdaftar sebagai peserta try out.
        </p>
        <a href="/form/newmembersup" className="mt-2 px-5 py-2 bg-green-700 text-white rounded-lg text-sm">
          Daftar Sekarang
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <p className="text-3xl mb-2">📋</p>
      <p className="font-semibold text-gray-700">
        Hasil {jenis?.toUpperCase()} belum tersedia
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Ikuti try out terlebih dahulu, atau tunggu hasil analisis dari admin.
      </p>
    </div>
  );
}