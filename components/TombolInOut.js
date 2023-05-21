import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function TombolInOut() {
  const { data: session } = useSession();
  //   console.log(session);
  if (session) {
    return (
      <>
        <div className="flex space-x-2 items-center">
          <p className="text-xs">Hai,{session.user.name}</p>
          <Image
            src={session.user.image}
            width={36}
            height={36}
            alt="userImage"
            className="rounded-full"
          />
          <div className="underline">
            <button onClick={() => signOut()}>
              <p className="text-xs">Sign out</p>
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex bg-orange-900 w-full space-x-2 items-center text-slate-100 p-2 text-xs">
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
