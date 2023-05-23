import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function TombolInOut() {
  // Controling scroll efect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const inOutElements = document.getElementsByClassName('inOut');
      for (let i = 0; i < inOutElements.length; i++) {
        inOutElements[i].style.color =
          scrollPosition > 120 ? '#f1f5f9' : '#020617';
      }
      // console.log(scrollPosition);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { data: session } = useSession();
  //   console.log(session);
  if (session) {
    return (
      <>
        <div className="flex space-x-2 items-center text-orange-900">
          <div className="">
            <p className="text-xs inOut">Hai,{session.user.name}</p>
            <button onClick={() => signOut()}>
              <p className="text-xs underline inOut">Sign out</p>
            </button>
          </div>
          <Image
            src={session.user.image}
            width={36}
            height={36}
            alt="userImage"
            className="rounded-full"
          />
        </div>
      </>
    );
  }
  return (
    <div className="flex w-full space-x-2 items-center text-orange-900 p-2 text-xs ">
      <p className="md:uppercase inOut  md:p-2 md:rounded">Not signed in,</p>
      <button onClick={() => signIn()}>
        <p className="underline inOut md:uppercase md:bg-orange-900 md:text-slate-100 md:p-2 md:rounded">
          Sign in
        </p>
      </button>
    </div>
  );
}
