import { Button } from "flowbite-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

export default function NavSoal({ sumSoal, tipeSoal, pages }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLocal = () => {
    localStorage.setItem("tipeSoal", tipeSoal);
  };
  const [link, setLink] = useState("");
  useEffect(() => {
    const link = localStorage.getItem("link");
    setLink(link);
  });
  return (
    <div>
      {/* modal */}

      {/* modal end */}
      <div className=" text-gray-100 text-center font-bold p-2 fixed bottom-10 left-0 right-0 z-50  flex md:items-center justify-center space-x-2">
        <div className="bg-gray-800 p-1 rounded text-xs">
          <Link href="/" className=" text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <div className="">
              <p className="text-xs"></p>
            </div>
          </Link>
        </div>
        {/* modal */}
        <div
          className={`${
            isMenuOpen ? "absolute" : "hidden"
          } w-1/2 h-[100px] p-5 rounded -top-24 bg-gray-50 `}
        >
          <div className="text-sm lg:flex-grow ">
            <p className="text-red-900 w-full border-b-2">
              Attention, Please!!!
            </p>
            <p className="text-gray-900 font-normal">
              Satu HP hanya bisa digunakan untuk login satu akun saja ya...
            </p>
          </div>
        </div>
        {/* modal end */}
        <div className="flex space-x-2">
          <button
            className="bg-gray-800 p-2 rounded text-xs text-yellow-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </button>
          {/* Lihat hasil */}
          {/* <a
            onClick={handleLocal}
            href="/form/output"
            className="bg-gray-800 p-2 rounded text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-graph-up"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
              />
            </svg>
          </a> */}
          {/* <div className="bg-gray-800 p-2 rounded text-xs hover:cursor-pointer">
            <Link href={`/form/output${link}`}>
              <span onClick={handleLocal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-graph-up"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
                  />
                </svg>
              </span>
            </Link>
          </div> */}
        </div>
        <div className="bg-gray-800 p-1 rounded text-xs">
          <Link href="/form/login" className=" text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>

            <div className="">
              <p className="text-xs"></p>
            </div>
          </Link>
        </div>
      </div>
      {/* <Button.Group>
        {pages.map((page) => (
          <Button
            key={page}
            className="bg-gray-800"
            onClick={() => setCurrentPage(page)}>
            {page}
          </Button>
        ))}
      </Button.Group> */}
    </div>
  );
}
