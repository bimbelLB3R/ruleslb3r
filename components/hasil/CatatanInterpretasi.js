
// ============================================================
// components/hasil/CatatanInterpretasi.jsx
// ============================================================
function buatCatatan(subtes, jenis) {
  if (!subtes?.length) return [];

  const terbaik  = [...subtes].sort((a, b) => b.score - a.score)[0];
  const terlemah = [...subtes].sort((a, b) => a.score - b.score)[0];

  const catatan = [];

  catatan.push({
    tipe: "positif",
    teks: `💪 Subtes terkuatmu adalah ${terbaik.label} dengan skor ${terbaik.score?.toFixed(0)} (${terbaik.kategoriSiswa}).`,
  });

  if (terlemah.subtesKey !== terbaik.subtesKey) {
    catatan.push({
      tipe: "perlu-perhatian",
      teks: `📌 Fokuskan latihan pada ${terlemah.label} (skor ${terlemah.score?.toFixed(0)}) untuk meningkatkan skor total.`,
    });
  }

  // Tambah pesan jika ada subtes kategori Rendah/Sangat Rendah
  const subtesBuruk = subtes.filter((s) =>
    ["Sangat Rendah", "Rendah"].includes(s.kategoriSiswa)
  );
  if (subtesBuruk.length > 0) {
    catatan.push({
      tipe: "perlu-perhatian",
      teks: `⚠️ ${subtesBuruk.map((s) => s.label).join(", ")} perlu ditingkatkan — pelajari kembali materi dasarnya.`,
    });
  }

  // Pesan persentil tertinggi
  const topPersentil = [...subtes].sort((a, b) => (b.persentil ?? 0) - (a.persentil ?? 0))[0];
  if (topPersentil?.persentil >= 70) {
    catatan.push({
      tipe: "positif",
      teks: `🏆 Di ${topPersentil.label}, kamu berada di atas ${topPersentil.persentil}% peserta lainnya!`,
    });
  }

  return catatan;
}

export function CatatanInterpretasi({ subtes, jenis }) {
  const catatan = buatCatatan(subtes, jenis);
  if (!catatan.length) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
      <p className="font-semibold text-gray-700">Catatan & Saran</p>
      {catatan.map((c, i) => (
        <div
          key={i}
          className={`rounded-lg p-3 text-sm ${
            c.tipe === "positif"
              ? "bg-green-50 text-green-800"
              : "bg-yellow-50 text-yellow-800"
          }`}
        >
          {c.teks}
        </div>
      ))}
    </div>
  );
}