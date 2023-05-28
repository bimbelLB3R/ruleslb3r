import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function CommentForm() {
  const { data: session } = useSession();
  // control input text
  const [text, setText] = useState('');
  const [warn, setWarn] = useState('');
  const maxLength = 15;
  const minLength = 10;
  const handleChange = (event) => {
    const inputText = event.target.value;

    if (inputText.length < minLength) {
      setWarn('Jumlah karakter minimal 10');
      setText(inputText);
    } else if (inputText.length <= maxLength) {
      setWarn('');
      setText(inputText);
    } else if (inputText > maxLength) {
      setWarn('Jumlah karakter maksimal 1000');
    } else {
      // Batasi teks hanya hingga maxLength karakter
      const truncatedText = inputText.slice(0, maxLength);
      setText(truncatedText);
    }
  };
  const buttonKirim = () => {
    return <button className="text-xs">kirim</button>;
  };

  return (
    <>
      <h1 className="font-bold mt-5">Komentar</h1>
      {session ? (
        <div className="flex space-x-2">
          <div className="flex w-[36px] h-[36px] p-1">
            <Image
              src={session.user.image}
              width={36}
              height={36}
              alt="userImage"
              className="rounded-full"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-red-900">{warn}</p>
              <button onClick={() => signOut()}>
                <p className="underline text-xs">Sign Out</p>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="komentar"
                placeholder={`sign in as ${session.user.name}`}
                className="w-full"
                value={text}
                onChange={handleChange}
                readOnly={text.length > maxLength}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {1000 - text.length} karakter tersisa
              </p>
              <div>{text.length >= 10 && buttonKirim()}</div>
            </div>
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
      {/* <div>
        <p>{warn}</p>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          readOnly={text.length > maxLength}
        />
        <p>{1000 - text.length} karakter tersisa</p>
        {text.length >= 10 && buttonKirim()}
      </div> */}
    </>
  );
}
