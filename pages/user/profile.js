import Link from "next/link";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
import "animate.css";
import { signIn, signOut, useSession } from "next-auth/react";

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
        <div className="flex justify-center p-6">
          <div>
            <div className="border-2 border-white rounded-full ">
              <div className="w-[12px] h-[12px]  rounded-full bg-green-400"></div>
              <Image
                src={session.user.image}
                width={46}
                height={46}
                alt="userFoto"
                priority={true}
                className="rounded-full shadow-2xl"
              />
            </div>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <div className="p-2 bg-blue-200 shadow-lg shadow-amber-600 m-2 rounded-lg">
              Pembayaran Tertunda : 0
            </div>
            <div className="p-2 bg-blue-200 shadow-lg shadow-amber-600 m-2 rounded-lg">
              Pembayaran Berhasil : 0
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
