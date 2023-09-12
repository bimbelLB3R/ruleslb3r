import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function DropdownMenuLayanan() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);
  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={menuRef}
            type="button"
            className="flex w-full justify-center items-center gap-x-1.5 text-slate-600  hover:text-slate-900"
            id="menu-button2"
            aria-expanded="true"
            aria-haspopup="true"
          >
            LAYANAN
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
        <div
          className={`${
            isMenuOpen
              ? "absolute  z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              : "hidden"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button2"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
            <Link
              href="/layanan"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200"
              role="menuitem"
              tabIndex="-1"
              // id="menu-item-0"
            >
              Bimbingan Belajar
            </Link>
            <Link
              href="/kampusku"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200"
              role="menuitem"
              tabIndex="-1"
              // id="menu-item-1"
            >
              Cek Keketatan Prodi
            </Link>
            <Link
              href="https://www.jambore.temubakat.com"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200"
              role="menuitem"
              tabIndex="-1"
              // id="menu-item-1"
            >
              Assesment Talents Mapping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
