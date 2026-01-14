import { useState } from "react";
import { useRouter } from "next/router";
import SoalForm from "./SoalForm";
import SoalList from "./SoalList";

export default function AdminLayout({ children, admin, onLogout }) {
  const router = useRouter();
  const [kategori, setKategori] = useState("snbt");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className=" text-gray-500 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/image/logolb3r.png" alt="Logo" className="h-10" />
              <div>
                <h1 className="text-xl font-bold">Dashboard Admin</h1>
                <p className="text-xs text-blue-200">Input & Kelola Soal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{admin?.nama || "Admin"}</p>
                <p className="text-xs text-blue-200">{admin?.role || "admin"}</p>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {children}
        {/* <SoalForm kategori={kategori}/>
        <SoalList kategori={kategori}/> */}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © 2025 Bimbel LB3R. All rights reserved.
        </div>
      </div>
    </div>
  );
}