import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { Transition } from "@headlessui/react";
import { useRef, useState, useEffect } from "react";
import BeritaTerbaru from "../../components/BeritaTerbaru";
import ArtikelTutorial from "../../components/ArtikelTutorial";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
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

export default function BlogsPage({ allPost, allTutorial }) {
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
  // console.log(allPost);
  // Use the `allPost` data in your component
  // Render your page content here
  return (
    <div>
      <Head>
        <title>Blogs</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Berisi informasi penting"
          key="desc"
        />
      </Head>
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
        <BeritaTerbaru allPost={allPost} />
        <ArtikelTutorial allTutorial={allTutorial} />
      </Layout>
    </div>
  );
}
