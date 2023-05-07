import { useSession, signIn, signOut } from 'next-auth/react';

const Wa = () => {
  return (
    <div>
      <div className="fixed bottom-12 right-8 md:bottom-12 md:right-12 z-50">
        <a href="/form" target="_blank">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="#EA580C"
            className="bi bi-chat-right-dots-fill"
            viewBox="0 0 16 16">
            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg> */}
          <img
            src="image/iconkritiksaran.png"
            className="w-12 z-50"
            alt="Kotak Saran"
          />
        </a>
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
