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

const Home = ({ allPost }) => {
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
          // menuItems={[
          //   { label: 'Sistem Pembayaran & Biaya', url: '/rules/payment' },
          //   { label: 'Cara Membuat Kelas Baru', url: '/rules/newclass' },
          //   { label: 'Aturan One Day Before', url: '/rules/odb' },
          //   { label: 'Ketentuan Kegiatan Belajar', url: '/rules/kbm' },
          //   { label: 'Ketentuan Berhenti Belajar', url: '/rules/off' },
          //   {
          //     label: 'MULAI SNBT',
          //     url: '/form/newmember',
          //   },
          // ]}
        />
      </Transition>
      <Layout>
        <BayarLes />
        <ImageSlide />
        <Welcome />
        <ButtonUmum />
        <BluryBg />
        <Faq />
        <InfoTerbaru />
        {/* <CodeBlog /> */}
      </Layout>
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  const data = getBlogsData();
  // const dataTutorial = getTutorialData();
  // console.log(dataTutorial);
  return {
    props: {
      allPost: data.posts,
      // allTutorial: dataTutorial.tutorials,
    },
  };
}
