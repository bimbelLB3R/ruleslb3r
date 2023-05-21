import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import Footer from './Footer';
import DropdownMenu from './DropdownMenu';
import TombolInOut from './TombolInOut';

export default function Navbar() {
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
    <>
      <nav>
        <div className="hidden md:visible md:bg-slate-100 shadow shadow-slate-400 md:flex justify-between items-center p-4 fixed top-0 w-full z-50">
          <div className="flex space-x-4">
            <Link href="/">
              <p className="text-slate-600 hover:text-slate-900">HOME</p>
            </Link>
            <Link href="/blogs">
              <p className="text-slate-600 hover:text-slate-900">BLOGS</p>
            </Link>
            <DropdownMenu />
          </div>
          <div className="flex space-x-4">
            {/* <Link href="/form/newmember">
              <p className="bg-orange-600 text-slate-50 py-2 px-4 text-center rounded">
                DAFTAR
              </p>
            </Link>
            <Link href="/form/login">
              <p className="text-center border border-orange-600 text-orange-600 py-2 px-4 rounded">
                LOGIN
              </p>
            </Link> */}
            <TombolInOut />
          </div>
        </div>
        <div className="flex justify-between bg-slate-100 p-3 md:hidden fixed  top-0 z-40 w-full shadow shadow-slate-400">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/image/logolb3r.png"
                width={100}
                height={40}
                alt="logo LB3r"
                priority={true}
              />

              {/* <div className="hidden md:visible md:flex">hello</div> */}
            </Link>
            <div className="md:hidden">
              <TombolInOut />
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={menuRef}
            className="text-orange-400 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-text-left"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
        <div className="md:flex md:items-center md:p-4">
          <div
            className={`${
              isMenuOpen
                ? 'block fixed top-5 z-30 mt-10 md:relative w-full bg-slate-100 md:hidden h-screen shadow shadow-slate-300"'
                : 'hidden  bg-slate-100  uppercase font-semibold text-slate-600'
            }`}>
            {/* button */}
            <div className="flex justify-center md:hidden ">
              <div className="w-full p-6">
                <div className="flex space-x-2 justify-center mb-4 font-semibold">
                  <Link href="/">
                    <p className="text-slate-600 hover:text-slate-900">HOME</p>
                  </Link>
                  <Link href="/blogs">
                    <p className="text-slate-600 hover:text-slate-900">BLOGS</p>
                  </Link>
                </div>
                <div>
                  <Link href="/form/newmember">
                    <p className="bg-orange-600 text-slate-50 px-2 py-4 text-center mb-2 rounded">
                      DAFTAR SNBT
                    </p>
                  </Link>
                  <Link href="/form/login">
                    <p className="text-center border border-orange-600 text-orange-600 px-2 py-4 rounded">
                      LOG IN TO SNBT
                    </p>
                  </Link>
                  <div className="m-4 text-center">
                    <h1 className="font-semibold text-slate-600">
                      TATA TERTIB & KETENTUAN
                    </h1>
                    <Link href="/rules/newclass">
                      <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                        Cara Membuat Kelas Baru
                      </p>
                    </Link>
                    <Link href="/rules/payment">
                      <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                        Cara Melakukan Pembayaran
                      </p>
                    </Link>
                    <Link href="/rules/kbm">
                      <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                        Tata Tertib KBM
                      </p>
                    </Link>
                    <Link href="/rules/odb">
                      <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                        Apa itu One Day Before
                      </p>
                    </Link>
                    <Link href="/rules/off">
                      <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                        Off Sementara, Tentu Bisa
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
