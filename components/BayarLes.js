import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const BayarLes = () => {
  return (
    <div>
      <div className="fixed bottom-12 right-8 md:bottom-12 md:right-12 z-20">
        <Link
          href="/layanan/bayarles"
          target="_blank"
          className="flex items-center space-x-1 bg-slate-100  p-2 text-emerald-700 rounded-full shadow-inner shadow-gray-900/50"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="#EA580C"
            className="bi bi-chat-right-dots-fill"
            viewBox="0 0 16 16">
            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg> */}
          <p className=" font-normal">Bayar Les</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>

          {/* <img
            src="image/iconkritiksaran.png"
            className="w-12 z-50"
            alt="Kotak Saran"
          /> */}
        </Link>
        {/* <button onClick={signIn}>
          <div className="flex  items-center text-gray-400 hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="#EA580C"
              className="bi bi-chat-right-dots-fill"
              viewBox="0 0 16 16">
              <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default BayarLes;
