import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Head from "next/head";
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
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} />
      <Layout>
        <BeritaTerbaru allPost={allPost} />
        <ArtikelTutorial allTutorial={allTutorial} />
      </Layout>
    </div>
  );
}
