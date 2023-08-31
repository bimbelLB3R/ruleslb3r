import Link from "next/link";
import Layout from "../../components/Layout";
// import Navbar from "../../components/Navbar";
import "animate.css";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Profile({ biodata }) {
  const filteredBiodata = biodata.map((item) => item);
  const { data: session } = useSession();
  const [choosenEmail, setChoosenEmail] = useState([]);
  //   console.log(choosenEmail);
  if (session) {
    const emailTerpilih = filteredBiodata.filter(
      (item) => item[8] == session.user.email
    );
    setChoosenEmail(emailTerpilih);
  }
  return (
    <div>
      {/* <Navbar allPost={allPost} /> */}
      <Layout>
        <div className="flex justify-center items-center p-6 mt-20">
          {session ? (
            <div className="overflow-auto">
              <div>
                <div className="flex justify-center">
                  <Image
                    src={session.user.image}
                    width={46}
                    height={46}
                    alt="userFoto"
                    priority={true}
                    className="rounded-full shadow-2xl"
                  />
                </div>
                <p className="text-center">{session.user.name}</p>
                <p className="text-center mb-4">{session.user.email}</p>
                <div className="font-semibold p-2 bg-blue-200 shadow-lg shadow-amber-600 m-2 rounded-lg">
                  Pembayaran Tertunda : 0
                </div>
                <div className="font-semibold p-2 bg-blue-200 shadow-lg shadow-amber-600 m-2 rounded-lg">
                  Pembayaran Berhasil : 0
                </div>
                {choosenEmail.map((item, index) => (
                  <div key={index}>
                    <div className="p-2 bg-blue-200 shadow-lg shadow-amber-600 m-2 rounded-lg">
                      <p className="font-semibold">Pilihan Jurusan</p>
                      <p>
                        1. Pilihan Pertama : {item[4]}, {item[6]}
                      </p>
                      <p>
                        2. Pilihan Kedua : {item[5]}, {item[7]}
                      </p>
                    </div>
                    <div className="p-2 bg-blue-200 shadow-lg shadow-amber-600 m-2 rounded-lg">
                      <p className="font-semibold">Skor Rata-rata TO SNBT</p>
                      <p>1. Literasi BI : {item[11]}</p>
                      <p>2. Literasi English : {item[14]}</p>
                      <p>3. Penalaran Umum : {item[16]}</p>
                      <p>4. Pemahaman Bacaan & Menulis : {item[15]}</p>
                      <p>5. Penalaran Matematika : {item[13]}</p>
                      <p>6. Pengetahuan & Pemahaman Umum : {item[17]}</p>
                      <p>7. Pengetahuan Kuantitatif : {item[12]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center p-6 mt-20">
              <button
                type="submit"
                name="loginGoogle"
                onClick={() => signIn()}
                className="underline"
              >
                Anda Belum Login
              </button>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

// ambil data soal
export async function getServerSideProps() {
  const req2 = await fetch(`https://bimbellb3r.com/api/biodata`);
  //   const req2 = await fetch(`localhost:3000/api/biodata`);
  const res2 = await req2.json();

  return {
    props: {
      biodata: res2.data,
    },
  };
}
