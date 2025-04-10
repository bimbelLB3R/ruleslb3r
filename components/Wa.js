import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Wa = () => {
  return (
    <div>
      <div className="fixed bottom-12 right-8 md:bottom-12 md:right-12 z-50">
        <Link
          href="https://wa.me/6285654179908"
          target="_blank"
          className="flex items-center space-x-1 bg-slate-100 bg-opacity-50 p-2 text-emerald-700 rounded-full shadow-inner shadow-orange-500/50">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="#EA580C"
            className="bi bi-chat-right-dots-fill"
            viewBox="0 0 16 16">
            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg> */}
          {/* <p className="text-slate-200 font-normal">Admin 1</p> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-whatsapp"
            viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
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

export default Wa;
