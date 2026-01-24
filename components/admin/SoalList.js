import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function SoalList({ kategori, onEdit, refreshTrigger}) {
  const [soalList, setSoalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSoalList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/soal/list?kategori=${kategori}&page=${currentPage}&limit=20`
      );
      const data = await response.json();

      if (response.ok) {
        setSoalList(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching soal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoalList();
  }, [kategori, currentPage, refreshTrigger]);

  const handleDelete = async (id) => {
     if (!id || !kategori) {
    Swal.fire("Error", "ID atau kategori tidak valid", "error");
    return;
  }
  
    const result = await Swal.fire({
      title: "Hapus Soal?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/admin/soal/delete?id=${id}&kategori=${kategori}`, {
  method: "DELETE"
});

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Terhapus!", data.message, "success");
          fetchSoalList();
        } else {
          Swal.fire("Gagal", data.error, "error");
        }
      } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan", "error");
      }
    }
  };

  const handleDuplicate = async (id) => {
  if (!confirm("Duplikat soal ini?")) return;

  const res = await fetch("/api/admin/soal/duplicate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      kategori,
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Soal berhasil diduplikat");
    fetchSoalList(); // reload list
  } else {
    alert("Gagal duplikat soal");
  }
};

  const filteredSoal = soalList.filter((soal) =>
    soal.soal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    soal.nomor_soal?.toString().includes(searchTerm)
  );
//   console.log(filteredSoal);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Search Bar */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Cari soal..."
          className="w-full md:w-96 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredSoal.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2">Belum ada soal</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  No
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Kategori
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Soal
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tipe
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Kunci
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSoal.map((soal) => (
                <tr key={soal.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm">{soal.nomor_soal}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {soal.kategori_soal || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm max-w-md">
                    <div className="truncate">{soal.soal}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        soal.typeOpsi === "pilgan"
                          ? "bg-blue-100 text-blue-800"
                          : soal.typeOpsi === "benarsalah"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {soal.typeOpsi || "pilgan"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600">
                    {soal.kunci_jawaban}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(soal)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(soal.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => handleDuplicate(soal.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                      >
                        Duplikat
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50 transition"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}