import Link from 'next/link';
import { useState } from 'react';

const Navbar = ({ logoUrl, logoAlt, menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="">
      <nav className="fixed bottom-0 md:relative z-40 w-full flex items-center justify-center md:justify-between flex-wrap bg-gray-400 md:bg-gray-900 p-6">
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
          <button
            className="flex items-center px-3 py-2  rounded text-orange-600  hover:text-gray-900 md:hover:text-gray-100"
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
        </div>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto `}>
          <div className="text-sm lg:flex-grow ">
            {menuItems.map((item) => (
              <Link href={item.url} key={item.label} className={className}>
                <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 md:text-gray-400  hover:text-white mr-4 underline underline-offset-4">
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
