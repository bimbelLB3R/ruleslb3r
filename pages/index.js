import Faq from "../components/Faq";
import Layout from "../components/Layout";
import ImageSlide from "../components/ImageSlide";
import Welcome from "../components/Welcome";
import ButtonUmum from "../components/ButtonUmum";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import BluryBg from "../components/BluryBg";
import BayarLes from "../components/BayarLes";
// import Wa from '../components/Wa';
import { Transition } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";
// import CodeBlog from "../components/CodeBlog";
import { getBlogsData } from "../utils/blogsApi";
import InfoTerbaru from "../components/InfoTerbaru";
import { getDataAlumni } from "../utils/alumniApi";
import Swal from "sweetalert2";
import Service from "../components/Layanan2024";
import { runFireworks } from "../libs/utils";
import PopBerita from "../components/PopBerita";
import ShortCut from "../components/ShortCut";
import WarningSnbt from "../components/WarningSnbt";
import VideoDraggable from "../components/Videodraggable";

const Home = ({ allPost, dataAlumni }) => {
  // console.log(allPost);
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   // Fungsi pembersihan
  //   let isMounted = true;
  //   // Memunculkan nama user secara bergantian
  //   const showUserName = (index) => {
  //     if (!isMounted) return;
  //     if (index >= dataAlumni.length) {
  //       // Jika sudah mencapai akhir data, ulangi dari awal
  //       setCurrentIndex(0);
  //       return;
  //     }

  //     // Tampilkan alert SweetAlert dengan jeda waktu 1 detik
  //     setTimeout(() => {
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: "bottom",
  //         background: "#fecaca",
  //         padding: "0.1rem",
  //         showConfirmButton: false,
  //         customClass: {
  //           // Atur kelas CSS untuk mengatur ukuran teks (contoh: 'custom-swal-text')
  //           content: "custom-swal-text",
  //         },
  //         timer: 3000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.addEventListener("mouseenter", Swal.stopTimer);
  //           toast.addEventListener("mouseleave", Swal.resumeTimer);
  //         },
  //       });

  //       Toast.fire({
  //         icon: "success",
  //         title: "Info SNBT",
  //         text: dataAlumni[index].nama,
  //       });
  //       // Swal.fire({
  //       //   showConfirmButton: false,
  //       //   timer: 1500,
  //       //   position: "bottom",
  //       //   showClass: {
  //       //     popup: "animate__animated animate__fadeInUp",
  //       //   },
  //       //   hideClass: {
  //       //     popup: "animate__animated animate__fadeOutDown",
  //       //   },
  //       //   backdrop: false,
  //       //   padding: "0.1rem",
  //       //   allowOutsideClick: false,
  //       //   text: dataAlumni[index].nama,
  //       // });

  //       // Lanjutkan ke nama user berikutnya
  //       if (isMounted) {
  //         // Tambahkan ini
  //         showUserName(index + 1);
  //       }
  //     }, 4000);
  //   };

  //   // Memulai rekursif untuk menampilkan nama user
  //   showUserName(currentIndex);
  //   // Fungsi pembersihan
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [currentIndex]);

  // console.log(allPost);
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef(null);
  useEffect(() => {
    // setShowNavbar(true);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // const windowHeight = window.innerHeight;

      if (scrollPosition > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    runFireworks();
  }, []);
  return (
    <div className="overflow-hidden scroll-smooth">
      <Meta />
      {/* <Wa /> */}
      <Transition
        show={showNavbar}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Navbar
          ref={navbarRef}
          logoUrl="/image/logolb3r.png"
          logoAlt="Logo"
          allPost={allPost}
        />
      </Transition>
      <Layout>
        <BayarLes />
        <WarningSnbt />
        <ImageSlide />
        <ButtonUmum />

        {/* <ShortCut /> */}
        <Welcome />
        <Service />
        <BluryBg />
        <Faq />
        <PopBerita beritaTerbaru={allPost} />
        {/* <InfoTerbaru /> */}
        {/* <CodeBlog /> */}
      </Layout>
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  const data = getBlogsData();
  const dataAlumni = getDataAlumni();
  // const dataTutorial = getTutorialData();
  // console.log(dataTutorial);
  return {
    props: {
      allPost: data.posts,
      dataAlumni: dataAlumni.alumni,
      // allTutorial: dataTutorial.tutorials,
    },
  };
}
