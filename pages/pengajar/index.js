import Link from "next/link";
import Layout from "../../components/Layout";
// import Navbar from "../../components/Navbar";
import Wa from "../../components/Wa";
import "animate.css";
import Head from "next/head";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getPengajarsData } from "../../utils/pengajarApi";
import Image from "next/image";
// mengubah mata uang
function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export async function getStaticProps() {
  const data = getPengajarsData();

  // console.log(data);
  return {
    props: {
      allPengajar: data.pengajars
    },
  };
}

export default function Pengajar({ allPengajar}) {
  // console.log(allPost);

  return (
    <>
      <Head>
        <title>Pengajar Bimbel LB3R</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Daftar pengajar bimbel LB3R"
          key="desc"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://raw.githubusercontent.com/bimbelLB3R/ruleslb3r/main/public/image/image1.webp"
        />
      </Head>
      <Wa />
      {/* <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} /> */}
      <Layout>
        <h1 className="font-architects text-center text-[35px] lg:text-[70px] m-[55px] lg:m-[100px] text-gray-200">PENGAJAR/PRAKTISI LB3R</h1>
        <h1 className="font-extrabold text-center text-[30px] -mt-[150px] mb-[60px]">PENGAJAR/PRAKTISI LB3R</h1>
        <div className="flex justify-center items-center">
          <div className="w-[20%] h-[2px] bg-yellow-500"></div>
        </div>
      <div className="flex items-center justify-center  md:p-[50px]">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-screen m-5">
        {allPengajar.map((pengajar,index)=>(
          <div key={index} className={`group flex items-center justify-center   h-[300px]   bg-gray-200 hover:bg-orange-300 rounded-2xl transition duration-500`}>
            <div>
              <div className="flex items-center justify-center">
              <Image src={`/image/tentor/${pengajar.foto}.png`}
                alt="hat"
                width={100}
                height={100}
                priority={true}
                className="object-scale-down sm:object-cover transition-transform duration-500 ease-in-out group-hover:translate-y-[-10px]" />
                </div>
              <div className="grid grid-col-1 gap-6">
              <p className="text-center font-architects">{pengajar.nama}</p>
              <p className="text-center font-architects uppercase">{pengajar.mapel}</p>
              <Link href="#" className="flex items-center justify-center"><p className="bg-gray-300 p-1 rounded-lg text-center w-[150px] h-[35px] hover:bg-gray-200">Undang</p></Link>
              </div>
              </div>
          </div>
        ))}
         </div>
         </div>
      </Layout>
    </>
  );
}
