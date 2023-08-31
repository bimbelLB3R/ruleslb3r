import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, forwardRef } from "react";
import Footer from "./Footer";
import DropdownMenu from "./DropdownMenu";
import TombolInOut from "./TombolInOut";
import TombolCari from "./TombolCari";
import DropdownMenuSNBT from "./DropdownMenuSNBT";
import DropdownMenuLayanan from "./DropdownMenuLayanan";
import { signIn, signOut, useSession } from "next-auth/react";
import DropdownMenuProfile from "./DropdownMenuProfile";

const Navbar = forwardRef(({ allPost, ...props }, ref) => {
  const { data: session } = useSession();
  // console.log(session);
  // console.log(allPost);
  // const mapPost = allPost.allPost.map((post) => console.log(post.title));
  // Controling scroll efect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const navChange = document.getElementById('nav');
  //     // console.log(scrollPosition);
  //     if (scrollPosition > 120) {
  //       navChange.style.backgroundColor = '#020617';
  //     } else {
  //       navChange.style.backgroundColor = '#f1f5f9';
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
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
            {/* <Link href="/layanan">
              <p className="text-slate-600 hover:text-slate-900">LAYANAN</p>
            </Link> */}
            <DropdownMenuLayanan />
            <Link href="/blogs">
              <p className="text-slate-600 hover:text-slate-900">BLOGS</p>
            </Link>
            <DropdownMenu />
            <DropdownMenuSNBT />
            <DropdownMenuProfile />
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
            {/* <TombolInOut /> */}
            <TombolCari allPost={allPost} />
          </div>
        </div>

        <div
          id="nav"
          className="bg-gradient-to-b from-red-500 to-white p-3 md:hidden fixed  top-0 z-40 w-full shadow shadow-slate-400"
        >
          <div className="absolute right-0 -top-6 ">
            <Image
              src="/image/petaindo.png"
              width={300}
              height={80}
              alt="indomap"
              priority={true}
              className="opacity-50"
            />
          </div>
          <div className="flex justify-between ">
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
            </div>

            <div className="flex items-center space-x-2 absolute z-10 right-4">
              <TombolCari allPost={allPost} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                ref={menuRef}
                className="text-red-900 "
                title="Toggle Menu"
              >
                {session ? (
                  <div className="border-2 border-white rounded-full relative">
                    <div className="w-[12px] h-[12px] absolute rounded-full bg-green-400"></div>
                    <Image
                      src={session.user.image}
                      width={46}
                      height={46}
                      alt="userFoto"
                      priority={true}
                      className="rounded-full shadow-2xl"
                    />
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="currentColor"
                    className="bi bi-text-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3   ">
            <div className="">
              <Link href="https://maps.app.goo.gl/P9qk89mYJ2piQr8j9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-pin-map-fill shadow-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                  />
                </svg>
              </Link>
            </div>
            <div className="border-l-2 border-gray-400 pl-1">
              <p className="text-[10px] font-semibold">Kantor Pusat :</p>
              <p className="text-[10px]">
                Jalan Ir. P.H.M. Noor RT 10 No. 24 Sulingan
              </p>
              <p className="text-[10px]">
                Kec. Murung Pudak, Kab. Tabalong, KalSel
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center md:p-4">
            <div
              className={`${
                isMenuOpen
                  ? 'block fixed top-5 z-30 mt-[90px] md:relative w-full bg-slate-100 md:hidden h-screen shadow shadow-slate-300"'
                  : "hidden  bg-slate-100  uppercase font-semibold text-slate-600"
              }`}
            >
              {/* button */}
              <div className="flex justify-center md:hidden h-full overflow-auto ">
                <div className="w-full p-6 pt-3 ">
                  <Link href="/" title="Home">
                    <div className="bg-orange-600 p-1 text-slate-50 m-1 rounded">
                      <div className="flex items-center space-x-2">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 "
                          >
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                          </svg>
                        </div>
                        <p>HOME</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/layanan">
                    <div className="bg-orange-600 p-1 text-slate-50 m-1 rounded">
                      <div className="flex items-center space-x-2">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                              clipRule="evenodd"
                            />
                            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                          </svg>
                        </div>
                        <p>LAYANAN</p>
                      </div>
                    </div>
                  </Link>
                  {/* <DropdownMenuLayanan /> */}
                  <Link href="/blogs">
                    <div className="bg-orange-600 p-1 text-slate-50 m-1 rounded">
                      <div className="flex items-center space-x-2">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p>BLOG</p>
                      </div>
                    </div>
                  </Link>

                  <div>
                    <Link href="/form/newmember">
                      <div className="bg-orange-600 p-1 text-slate-50 m-1 rounded">
                        <div className="flex items-center space-x-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p>DAFTAR SNBT</p>
                        </div>
                      </div>
                    </Link>
                    <Link href="/form/login">
                      <div className="bg-orange-600 p-1 text-slate-50 m-1 rounded">
                        <div className="flex items-center space-x-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p>MULAI TRY OUT SNBT</p>
                        </div>
                      </div>
                    </Link>
                    <Link href="/kampusku">
                      <div className="bg-orange-600 p-1 text-slate-50 m-1 rounded">
                        <div className="flex items-center space-x-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                            </svg>
                          </div>
                          <p>CEK KEKETATAN PRODI</p>
                        </div>
                      </div>
                    </Link>
                    <Link href="/user/term">
                      <div className="bg-orange-600 p-1 text-slate-50 m-1 rounded">
                        <div className="flex items-center space-x-2">
                          <div>
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
                                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                              />
                            </svg>
                          </div>
                          <p>CEK TATA TERTIB & KETENTUAN</p>
                        </div>
                      </div>
                    </Link>
                    {session ? (
                      <div className="flex items-center justify-end p-2 underline">
                        <div>
                          <div>
                            <Link href="/user/profile">My Account</Link>
                          </div>
                          <button onClick={() => signOut()}>
                            Keluar dari {session.user.name}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center space-x-2 justify-end font-roboto mt-4">
                          <button
                            type="submit"
                            name="loginGoogle"
                            onClick={() => signIn()}
                            className="underline"
                          >
                            Login dengan
                          </button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-google"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});
export default Navbar;
