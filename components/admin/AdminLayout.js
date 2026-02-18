import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminLayout({ children, admin, onLogout }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { 
      icon: "📝", 
      label: "Kelola Soal", 
      href: "/admin/mydashboard",
      active: router.pathname === "/admin/mydashboard"
    },
    { 
      icon: "👥", 
      label: "Data Siswa", 
      href: "/admin/siswa",
      active: router.pathname === "/admin/siswa"
    },
    { 
      icon: "📊", 
      label: "Analisis IRT", 
      href: "/admin/analisis",
      active: router.pathname === "/admin/analisis"
    },
    { 
      icon: "⚙️", 
      label: "Pengaturan", 
      href: "/admin/settings",
      active: router.pathname === "/admin/settings"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* ═══ TOP BAR ═══════════════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="h-full px-4 flex items-center justify-between">
          
          {/* Left: Logo + Toggle */}
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Desktop */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <img src="/image/logolb3r.png" alt="Logo" className="h-9 transition-transform group-hover:scale-105" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-800 leading-tight">Dashboard Admin</h1>
                <p className="text-xs text-gray-500">Bimbel LB3R</p>
              </div>
            </Link>
          </div>

          {/* Right: User Info + Logout */}
          <div className="flex items-center gap-3">
            {/* User Avatar & Info */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {admin?.nama?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800 leading-tight">{admin?.nama || "Admin"}</p>
                <p className="text-xs text-gray-500 capitalize">{admin?.role || "admin"}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-sm group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══ SIDEBAR DESKTOP ═══════════════════════════════════════════════ */}
      <aside
        className={`hidden lg:block fixed top-16 left-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                item.active
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <span
                className={`font-medium text-sm whitespace-nowrap transition-all ${
                  sidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {item.label}
              </span>
              {item.active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 ${sidebarOpen ? "" : "hidden"}`}>
          <div className="text-xs text-gray-400 text-center">
            <p>© 2025 Bimbel LB3R</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* ═══ MOBILE MENU ═══════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Drawer */}
          <aside className="lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 shadow-xl animate-slide-in-left">
            <nav className="p-4 space-y-2">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    item.active
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile User Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {admin?.nama?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{admin?.nama || "Admin"}</p>
                  <p className="text-xs text-gray-500 capitalize">{admin?.role || "admin"}</p>
                </div>
              </div>
              <div className="text-xs text-gray-400 text-center">
                <p>© 2025 Bimbel LB3R</p>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════════════ */}
      <main
        className={`pt-16 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <div className="p-4 lg:p-6 max-w-[1600px] mx-auto">
          {children}
        </div>

        {/* Footer */}
        <footer className="mt-12 py-6 text-center text-sm text-gray-500 border-t border-gray-200 bg-white/50">
          <p>© 2025 Bimbel LB3R. All rights reserved.</p>
          <p className="text-xs mt-1">Made with ❤️ for better education</p>
        </footer>
      </main>

      {/* Custom Animation for Mobile Menu */}
      <style jsx>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}