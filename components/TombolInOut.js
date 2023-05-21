import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function TombolInOut() {
  const { data: session } = useSession();
  //   console.log(session);
  if (session) {
    return (
      <>
        <div className="flex space-x-2 items-center">
          <div className="">
            <p className="text-xs">Hai,{session.user.name}</p>
            <button onClick={() => signOut()}>
              <p className="text-xs underline">Sign out</p>
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
    <div className="flex  w-full space-x-2 items-center text-orange-900 p-2 text-xs">
      <p>Not signed in,</p>
      <button onClick={() => signIn()}>
        <p className="underline">Sign in</p>
      </button>
    </div>
  );
}
