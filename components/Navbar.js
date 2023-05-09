import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Navbar = ({ logoUrl, logoAlt }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div>
      <nav className="fixed top-0 z-50  w-full md:flex md:items-center md:justify-between flex-wrap bg-gray-900 p-1">
        <div className="hidden md:visible md:flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <img
              src={logoUrl}
              alt={logoAlt}
              className=" mr-2 cursor-pointer"
              width={100}
              height={40}
            />
          </Link>
        </div>
        <div className="block lg:hidden">
          <div className="flex justify-between items-center">
            <button
              className="cursor-pointer flex items-center px-3 py-2  rounded text-orange-200  hover:text-orange-300 "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={menuRef}
              id="Menu"
              aria-label="Tombol Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-3 md:hidden">
              <p className="cursor-pointer text-gray-900 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl font-medium p-2">
                Paket Belajar
              </p>
              <p className="cursor-pointer text-gray-900 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl font-medium p-2">
                Masuk/Daftar
              </p>
              <Link href="/" aria-label="go to home">
                <div className="cursor-pointer text-gray-900 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl font-medium p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-end`}>
          <div className="flex ">
            <div className="text-sm lg:flex-grow">
              <div className="flex justify-between place-items-end">
                <div className="text-sm lg:flex-grow">
                  <Link href="/">
                    <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
                      Home
                    </div>
                  </Link>
                  <Link href="/rules/payment">
                    <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
                      Sistem Pembayaran
                    </div>
                  </Link>
                  <Link href="/rules/newclass">
                    <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
                      Buat Kelas Baru
                    </div>
                  </Link>
                  <Link href="/rules/odb">
                    <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
                      Aturan ODB
                    </div>
                  </Link>
                  <Link href="/rules/kbm">
                    <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
                      Aturan KBM
                    </div>
                  </Link>
                  <Link href="/rules/off">
                    <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
                      Aturan Berhenti
                    </div>
                  </Link>
                </div>
                <div className="hidden md:visible md:flex items-center space-x-3">
                  <p className="cursor-pointer text-gray-900 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl font-medium p-2">
                    Paket Belajar
                  </p>
                  <p className="cursor-pointer text-gray-900 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl font-medium p-2">
                    Masuk/Daftar
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center justify-center space-x-4">
              <p className="bg-blue-600 px-2 py-1 rounded">Daftar</p>
              <p className="bg-blue-600 px-2 py-1 rounded">Login</p>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
