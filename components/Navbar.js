import Link from 'next/link';
import { useState } from 'react';

const Navbar = ({ logoUrl, logoAlt }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="">
      <nav className="relative  w-full md:flex md:items-center md:justify-between flex-wrap bg-gray-900 p-1">
        <div className="hidden md:visible md:flex items-center flex-shrink-0 text-white mr-6">
          <a href="/">
            <img
              src={logoUrl}
              alt={logoAlt}
              className="fill-current h-10 w-24 mr-2"
            />
          </a>
          <span className=" text-[8px] "></span>
        </div>
        <div className="block lg:hidden">
          <div className="flex justify-between items-center">
            <button
              className="flex items-center px-3 py-2  rounded text-white  hover:text-gray-200 "
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            <div className="flex items-center space-x-1">
              <p className="text-gray-900 text-sm bg-orange-200 rounded-xl font-medium px-2 py-1">
                Paket Belajar
              </p>
              <p className="text-gray-900 text-sm bg-orange-200 rounded-xl font-medium px-2 py-1">
                Masuk/Daftar
              </p>
              <div className="text-gray-900 text-sm bg-orange-200 rounded-xl font-medium p-1">
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
            </div>
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto `}>
          <div className="flex">
            <div className="text-sm lg:flex-grow">
              <Link href="/">
                <a className="hover:bg-gray-300 md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-xs md:text-sm">
                  Home
                </a>
              </Link>
              <Link href="/rules/payment">
                <a className="hover:bg-gray-300 md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-xs md:text-sm">
                  Sistem Pembayaran
                </a>
              </Link>
              <Link href="/rules/newclass">
                <a className="hover:bg-gray-300 md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-xs md:text-sm">
                  Buat Kelas Baru
                </a>
              </Link>
              <Link href="/rules/odb">
                <a className="hover:bg-gray-300 md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-xs md:text-sm">
                  Aturan ODB
                </a>
              </Link>
              <Link href="/rules/kbm">
                <a className="hover:bg-gray-300 md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-xs md:text-sm">
                  Aturan KBM
                </a>
              </Link>
              <Link href="/rules/off">
                <a className="hover:bg-gray-300 md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-xs md:text-sm">
                  Aturan Berhenti
                </a>
              </Link>
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
