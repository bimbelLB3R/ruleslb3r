import Link from "next/link";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Wa from "../../components/Wa";
import "animate.css";
import Head from "next/head";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getPengajarsData } from "../../utils/pengajarApi";
import { getBlogsData } from "../../utils/blogsApi";
import { getPraktisiData } from "../../utils/praktisiApi";
import Image from "next/image";
import Medsos from "../../components/Medsos";
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
  const data2=getBlogsData();
  const data3=getPraktisiData();

  // console.log(data);
  return {
    props: {
      allPengajar: data.pengajars,
      allPost:data2.posts,
      allPraktisi:data3.praktisis
    },
  };
}

export default function Pengajar({ allPengajar,allPost,allPraktisi}) {
  // console.log(allPost);

  return (
    <>
      <Head>
        <title>Pengajar Bimbel LB3R</title>
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
          content="https://raw.githubusercontent.com/bimbelLB3R/ruleslb3r/main/public/image/image6.webp"
        />
      </Head>
      <Wa />
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} />
      <Layout>
        <h1 className="font-architects text-center text-[25px] lg:text-[70px] mt-[60px] md:m-[55px] lg:m-[100px] text-gray-200">PENGAJAR & PRAKTISI</h1>
        <h1 className="font-extrabold text-center text-[30px] md:-mt-[150px] mb-[40px]">TIM LB3R</h1>
        <div className="flex justify-center items-center">
          <div className="w-[20%] h-[2px] bg-yellow-500"></div>
        </div>
        <div className="flex items-center justify-center  md:p-[50px]">
          <div className="grid md:grid-cols-2  gap-8 w-screen m-5">
            {allPraktisi.map((praktisi,index)=>{
              const pesan=encodeURIComponent(`Mohon ijin untuk konsultasi jurusan atau keluarga dengan ${praktisi.foto} `);
              return <div key={index} className={`group flex items-center justify-center   h-[300px] bg-[url('/image/card.png')] bg-cover bg-center  rounded-2xl transition duration-500`}>
                  <div>
                    <div className="flex items-center justify-center">
                      <Image src={`/image/tentor/${praktisi.foto}.png`}
                        alt="praktisi"
                        width={100}
                        height={100}
                        priority={true}
                        className="object-scale-down sm:object-cover transition-transform duration-500 ease-in-out group-hover:translate-y-[-10px]" />
                  </div>
              <div className="grid grid-col-1 gap-6">
                  <div>
                    <p className="text-center font-architects">{praktisi.nama}</p>
                    <p className="text-center font-architects uppercase ">{praktisi.job}</p>
                    <Medsos facebook={praktisi.facebook} instagram={praktisi.instagram} twitter={praktisi.twitter}/>
                    </div>
              
                  <Link href={`https://wa.me/6281392552459?text=${pesan}`} className="flex items-center justify-center"><p className="bg-gray-300 p-1 rounded-lg text-center w-[150px] h-[35px] hover:bg-gray-200">Konsultasi</p></Link>
              </div>
            </div>
            </div>
        })}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[20%] h-[2px] bg-yellow-500"></div>
        </div>
        <div className="flex items-center justify-center  md:p-[50px]">
          <div className="grid md:grid-cols-2  gap-8 w-screen m-5">
        {allPengajar.map((pengajar,index)=>{
          const pesan=encodeURIComponent(`Mohon ijin untuk konsultasi dengan ${pengajar.foto} terkait materi ...`)
          return (<div key={index} className={`group flex items-center justify-center   h-[300px]   bg-[url('/image/card.png')] bg-cover bg-center rounded-2xl transition duration-500`}>
            <div>
              <div className="flex items-center justify-center">
              <Image src={`/image/tentor/${pengajar.foto}.png`}
                alt="hat"
                width={100}
                height={100}
                priority={true}
                className="object-scale-down sm:object-cover transition-transform duration-500 ease-in-out group-hover:translate-y-[-10px]"/>
                </div>
              <div className="grid grid-col-1 gap-6">
                <div>
                  <p className="text-center font-architects">{pengajar.nama}</p>
              <p className="text-center font-architects uppercase">{pengajar.mapel}</p>
              <Medsos facebook={pengajar.facebook} instagram={pengajar.instagram} twitter={pengajar.twitter}/>
              </div>
              
              <Link href={`https://wa.me/6285654179908?text=${pesan}`} className="flex items-center justify-center"><p className="bg-gray-300 p-1 rounded-lg text-center w-[150px] h-[35px] hover:bg-gray-200">Konsultasi</p></Link>
              </div>
              </div>
          </div>)
})}
        </div>
        
      </div>
      </Layout>
    </>
  );
}
