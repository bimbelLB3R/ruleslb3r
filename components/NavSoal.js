import { Button } from 'flowbite-react';
import React, { useState, useEffect, useRef } from 'react';

export default function NavSoal({ sumSoal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      {/* modal */}

      {/* modal end */}
      <div className=" text-gray-100 text-center font-bold p-2 fixed bottom-8 left-0 right-0 z-50  flex md:items-center justify-center">
        {/* modal */}
        <div
          className={`${
            isMenuOpen ? 'absolute' : 'hidden'
          } w-1/2 h-[100px] p-5 rounded -top-24 bg-gray-50 `}>
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
            className="bg-gray-800 p-2 rounded text-xs"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle"
              viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </button>
          {/* Lihat hasil */}
          <a href="/form/output" className="bg-gray-800 p-2 rounded text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-graph-up"
              viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
              />
            </svg>
          </a>
        </div>
      </div>
      <Button.Group>
        {sumSoal.map((item) => (
          <Button key={item[0]} className="bg-gray-800" href={`#${item[28]}`}>
            {item[28]}
          </Button>
        ))}
        {/* <Button color="gray">2</Button>
        <Button color="gray">3</Button>
        <Button color="gray">4</Button>
        <Button color="gray">5</Button>
        <Button color="gray">6</Button>
        <Button color="gray">7</Button>
        <Button color="gray">8</Button>
        <Button color="gray">9</Button>
        <Button color="gray">10</Button>
    <Button color="gray">11</Button> */}
      </Button.Group>
    </div>
  );
}
