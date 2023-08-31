import Link from "next/link";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
import "animate.css";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export async function getStaticProps() {
  const data = getBlogsData();
  const dataTutorial = getTutorialData();
  // console.log(dataTutorial);
  return {
    props: {
      allPost: data.posts,
      allTutorial: dataTutorial.tutorials,
    },
  };
}
export default function Profile({ allPost }) {
  const { data: session } = useSession();
  return (
    <div>
      <Navbar allPost={allPost} />
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
                <div className="p-2 bg-blue-200 shadow-lg shadow-amber-600 m-2 rounded-lg">
                  <p className="font-semibold">Pilihan Jurusan</p>
                  <p>1. Pilihan Pertama</p>
                  <p>2. Pilihan Kedua</p>
                </div>
                <div className="p-2 bg-blue-200 shadow-lg shadow-amber-600 m-2 rounded-lg">
                  <p className="font-semibold">Skor Rata-rata TO SNBT</p>
                  <p>1. Literasi BI : -</p>
                  <p>2. Literasi English : -</p>
                  <p>3. Penalaran Umum : -</p>
                  <p>4. Pemahaman Bacaan & Menulis : -</p>
                  <p>5. Penalaran Matematika : -</p>
                  <p>6. Pengetahuan & Pemahaman Umum : -</p>
                  <p>7. Pengetahuan Kuantitatif : -</p>
                </div>
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
