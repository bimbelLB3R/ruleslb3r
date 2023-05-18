// import Link from 'next/link';
// import { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';

// const Navbar = ({ logoUrl, logoAlt }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMenuOpen(false);
//       }
//     }
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [menuRef]);

//   return (
//     <div>
//       <nav className="fixed top-0 z-50  w-full md:flex md:items-center md:justify-between flex-wrap shadow shadow-slate-400 p-1 bg-slate-50">
//         <div className="hidden md:visible md:flex items-center flex-shrink-0 text-white mr-6">
//           <Link href="/">
//             <img
//               src={logoUrl}
//               alt={logoAlt}
//               className=" mr-2 cursor-pointer"
//               width={100}
//               height={40}
//             />
//           </Link>
//         </div>
//         <div className="block lg:hidden">
//           <div className="flex justify-between items-center">
//             <button
//               className="cursor-pointer flex items-center px-3 py-2  rounded text-orange-200  hover:text-orange-300 "
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               ref={menuRef}
//               id="Menu"
//               aria-label="Tombol Menu">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="36"
//                 height="36"
//                 fill="currentColor"
//                 className="bi bi-list"
//                 viewBox="0 0 16 16">
//                 <path
//                   fillRule="evenodd"
//                   d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
//                 />
//               </svg>
//             </button>
//             <div className="flex items-center space-x-3 md:hidden">
//               {/* <p className="cursor-pointer text-gray-900 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl  p-2 uppercase font-semibold">
//                 Paket Belajar
//               </p>
//               <p className="cursor-pointer text-gray-900 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl  p-2 uppercase font-semibold">
//                 Masuk/Daftar
//               </p> */}
//               <Link href="/" aria-label="go to home">
//                 <div className="cursor-pointer text-gray-900 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl font-medium p-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-6 h-6">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
//                     />
//                   </svg>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div
//           className={`${
//             isMenuOpen ? 'block' : 'hidden'
//           } w-full  lg:flex lg:items-center lg:w-auto justify-end`}>
//           <div className="flex ">
//             <div className="text-sm lg:flex-grow">
//               <div className="flex justify-between place-items-end">
//                 <div className="text-sm lg:flex-grow">
//                   <Link href="/">
//                     <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-slate-600   md:hover:text-slate-900 font-semibold mr-4 md:hover:underline underline-offset-4 text-sm">
//                       HOME
//                     </div>
//                   </Link>
//                   <p className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-slate-600   md:hover:text-slate-900 font-semibold mr-4 md:hover:underline underline-offset-4 text-sm">
//                     RULES
//                   </p>
//                   <Link
//                     href="/blogs"
//                     className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-slate-600   md:hover:text-slate-900 font-semibold mr-4 md:hover:underline underline-offset-4 text-sm">
//                     BLOGS
//                   </Link>
//                   {/* <Link href="/rules/payment">
//                     <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
//                       Sistem Pembayaran
//                     </div>
//                   </Link>
//                   <Link href="/rules/newclass">
//                     <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
//                       Buat Kelas Baru
//                     </div>
//                   </Link>
//                   <Link href="/rules/odb">
//                     <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
//                       Aturan ODB
//                     </div>
//                   </Link>
//                   <Link href="/rules/kbm">
//                     <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm">
//                       Aturan KBM
//                     </div>
//                   </Link>
//                   <Link href="/rules/off">
//                     <div className="cursor-pointer hover:bg-orange-300 hover:text-gray-900  md:hover:bg-opacity-0 p-2 block lg:inline-block lg:mt-0 text-gray-100 md:text-gray-400  md:hover:text-white mr-4 md:hover:underline underline-offset-4 text-sm uppercase font-semibold">
//                       Aturan Berhenti
//                     </div>
//                   </Link> */}
//                 </div>
//                 {/* <div className="hidden md:visible md:flex items-center space-x-3">
//                   <p className="cursor-pointer text-slate-600 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl  p-2 uppercase font-semibold">
//                     Paket Belajar
//                   </p>
//                   <p className="cursor-pointer text-slate-600 text-sm bg-orange-200 hover:bg-orange-300 rounded-xl  p-2 uppercase font-semibold">
//                     Masuk/Daftar
//                   </p>
//                 </div> */}
//               </div>
//             </div>
//             {/* <div className="flex items-center justify-center space-x-4">
//               <p className="bg-blue-600 px-2 py-1 rounded">Daftar</p>
//               <p className="bg-blue-600 px-2 py-1 rounded">Login</p>
//             </div> */}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

// 'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import Footer from './Footer';
import DropdownMenu from './DropdownMenu';

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
            <Link href="/form/newmember">
              <p className="bg-orange-600 text-slate-50 py-2 px-4 text-center rounded">
                DAFTAR
              </p>
            </Link>
            <Link href="/form/login">
              <p className="text-center border border-orange-600 text-orange-600 py-2 px-4 rounded">
                LOGIN
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-between bg-slate-100 p-3 md:hidden fixed  top-0 z-40 w-full shadow shadow-slate-400">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/image/logolb3r.png"
                width={100}
                height={40}
                alt="logo LB3r"
              />
              {/* <div className="hidden md:visible md:flex">hello</div> */}
            </Link>
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
                ? 'block absolute z-30 mt-10 md:relative w-full bg-slate-100 md:hidden h-screen shadow shadow-slate-300"'
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
                      DAFTAR
                    </p>
                  </Link>
                  <Link href="/form/login">
                    <p className="text-center border border-orange-600 text-orange-600 px-2 py-4 rounded">
                      MASUK
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
