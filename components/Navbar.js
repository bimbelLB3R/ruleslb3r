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
import DropdownMenuDok from "./DropdownMenuDok";
import "animate.css";

const Navbar = forwardRef(({ allPost, ...props }, ref) => {
  const { data: session } = useSession();
  

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
  const handleSignIn = async () => {
    try {
      // Menetapkan prompt ke 'select_account' saat memanggil signIn
      await signIn("google", { prompt: "select_account" });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <nav>
        <div className="hidden lg:visible lg:bg-slate-100 shadow shadow-slate-400 lg:flex justify-between items-center p-4 fixed top-0 w-full z-50">
        
        <div className="flex items-center space-x-2">
              <Link href="/">
                <Image
                  src="/image/logolb3r.png"
                  width={100}
                  height={40}
                  alt="logo LB3r"
                  priority={true}
                  // className="w-18 h-12 "
                />

                {/* <div className="hidden md:visible md:flex">hello</div> */}
              </Link>
            </div>
          <div className="flex space-x-4">
            <Link href="/">
              <p className="text-slate-600 hover:text-slate-900">HOME</p>
            </Link>
            {/* <Link href="/layanan">
              <p className="text-slate-600 hover:text-slate-900">LAYANAN</p>
            </Link> */}
            <DropdownMenuLayanan />
            <DropdownMenuDok />
            {/* <Link href="/blogs">
              <p className="text-slate-600 hover:text-slate-900">BLOGS</p>
            </Link> */}
            <DropdownMenu />
            <DropdownMenuSNBT />
            {/* <DropdownMenuProfile /> */}
          </div>
          <div className="flex space-x-4">
            
            <TombolCari allPost={allPost} />
          </div>
        </div>

        <div
          id="nav"
          className="bg-slate-200 p-3 lg:hidden fixed  top-0 z-40 w-full lg:shadow lg:shadow-slate-400 items-center flex "
        >
          

          <div className="flex justify-between ">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Image
                  src="/image/logolb3r.png"
                  width={100}
                  height={40}
                  alt="logo LB3r"
                  priority={true}
                  // className="w-18 h-12 "
                />

                {/* <div className="hidden md:visible md:flex">hello</div> */}
              </Link>
            </div>

            <div className="flex items-center space-x-2 absolute z-10 right-4">
              {/* <TombolCari allPost={allPost} /> */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                ref={menuRef}
                className="text-orange-400 "
                title="Toggle Menu"
              >
                {session ? (
                  <div className="border-2 border-white rounded-full relative">
                    <div className="w-[8px] h-[8px] absolute rounded-full bg-green-400"></div>
                    <Image
                      src={session.user.image}
                      width={36}
                      height={36}
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
          
          <div className="md:flex md:items-center md:p-4">
            <div
              className={`${
                isMenuOpen
                  ? "block fixed top-5 z-30 mt-[43px] md:relative w-full left-0 bg-slate-900/80 md:hidden h-screen shadow shadow-slate-300 animate__animated  animate__fadeInDown"
                  : "hidden  bg-slate-100  uppercase font-semibold text-slate-600"
              }`}
            >
              {/* button */}
              <div className="overflow-auto">
                <div className="flex justify-center items-center md:hidden  overflow-auto ">
                  <div className="w-full flex flex-wrap p-2 justify-center items-center mt-10">
                    <Link href="/" title="Home">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div>
                          <div className="text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-10 h-10 "
                            >
                              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                            <p>Home</p>
                          </div>
                          {/* <p>HOME</p> */}
                        </div>
                      </div>
                    </Link>
                    <Link href="/layanan">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-10 h-10"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                                clipRule="evenodd"
                              />
                              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                            </svg>
                            <p>Service</p>
                          </div>
                          {/* <p>LAYANAN</p> */}
                        </div>
                      </div>
                    </Link>
                    {/* <DropdownMenuLayanan /> */}
                    <Link href="/blogs">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-10 h-10"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p>Blog</p>
                          </div>
                          {/* <p>BLOG</p> */}
                        </div>
                      </div>
                    </Link>
                    <Link href="/feedback">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-10 h-10"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <p>Rate Us</p>
                          </div>
                          {/* <p>BLOG</p> */}
                        </div>
                      </div>
                    </Link>

                    <Link href="/form/loginsupa">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-10 h-10"
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
                            <p>SNBT</p>
                          </div>
                          {/* <p>MULAI TRY OUT SNBT</p> */}
                        </div>
                      </div>
                    </Link>
                    <Link href="/form/logintka">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-10 h-10"
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
                            <p>TKA</p>
                          </div>
                          {/* <p>MULAI TRY OUT SNBT</p> */}
                        </div>
                      </div>
                    </Link>
                    <Link href="/kampusku">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-10 h-10"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                              />
                            </svg>

                            <p>Kampus</p>
                          </div>
                          {/* <p>CEK KEKETATAN PRODI</p> */}
                        </div>
                      </div>
                    </Link>
                    <Link href="/user/term">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-10 h-10"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                              />
                            </svg>
                            <p>Tatib</p>
                          </div>
                          {/* <p>CEK TATA TERTIB & KETENTUAN</p> */}
                        </div>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-10 h-10"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                              />
                            </svg>
                            <p>Bakat</p>
                          </div>
                          {/* <p>ASSESMENT TALENTS MAPPING</p> */}
                        </div>
                      </div>
                    </Link>
                    <Link href="/pengajar">
                      <div className="bg-gray-900 p-1 text-orange-400 m-1 rounded w-[75px] h-[75px] flex items-center justify-center">
                        <div className="">
                          <div className="">
                            <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-workspace" viewBox="0 0 16 16">
                              <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                              <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                            </svg>
                            </div>
                            <p>Pengajar</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="md:hidden ">
                  <div>
                    {session ? (
                      <div className="flex items-center justify-end p-2 underline text-slate-50">
                        <div>
                          {/* <div>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="/user/profile"
                            >
                              My Account
                            </a>
                          </div> */}
                          <button onClick={() => signOut()}>
                            Keluar dari {session.user.name}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center space-x-2 justify-center font-roboto mt-4 ">
                          <button
                            type="submit"
                            name="loginGoogle"
                            // onClick={() => signIn()}
                            onClick={handleSignIn}
                            className="underline  bg-slate-900   text-slate-50 px-3 py-3 rounded-xl"
                          >
                            Login dengan Google
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
