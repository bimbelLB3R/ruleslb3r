import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function CommentForm() {
  const { data: session } = useSession();
  return (
    <>
      <h1 className="font-bold mt-5">Komentar</h1>
      {session ? (
        <div className="flex items-center space-x-2">
          <Image
            src={session.user.image}
            width={36}
            height={36}
            alt="userImage"
            className="rounded-full"
          />

          <div>
            <input
              type="text"
              name="komentar"
              placeholder={`sign in as ${session.user.name}`}
              className="w-full"
            />
            <button onClick={() => signOut()}>
              <p className="underline text-xs">Sign Out</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-1 items-center">
          <input
            type="text"
            name="komentar"
            placeholder="sign in untuk komen"
            className=""
            readOnly
          />
          <div>
            <button onClick={() => signIn()}>
              <p className="underline text-xs">Sign In</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
