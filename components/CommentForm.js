import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function CommentForm() {
  const { data: session } = useSession();
  return (
    <>
      <h1 className="font-bold">Komentar</h1>
      {session ? (
        <div>
          <Image
            src={session.user.image}
            width={36}
            height={36}
            alt="userImage"
            className="rounded-full"
          />
          <input
            type="text"
            name="komentar"
            placeholder="sign in untuk komen"
          />
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
