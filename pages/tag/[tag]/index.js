import Layout from '../../../components/Layout';
import { getBlogsData } from '../../../utils/blogsApi';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import Head from 'next/head';

// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/blogs`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

export default function PostDetail({ tagPost }) {
  return (
    <>
      <Head>
        <title>Tag</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta name="description" content="tag" key="desc" />
      </Head>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" />
      <Layout>
        <div className="p-4 h-screen mt-20 md:max-w-xl md:flex md:justify-center md:m-auto md:mt-20">
          <div>
            <h1 className="font-semibold text-xl">
              {tagPost.map((tag) => (
                <div key={tag.id}>
                  <Link href={`/blogs/${tag.slug}`}>
                    <p>{tag.title}</p>
                  </Link>
                </div>
              ))}
            </h1>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const data = await getBlogsData();
  const allPost = data.posts;

  const paths = allPost.map((post) => ({
    params: { tag: post.tags },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getBlogsData();
  const allPost = data.posts;
  const postTag = params.tag;
  // Find the post with a matching id
  const tagPost = allPost.filter((post) => post.tags == postTag);
  //   console.log(tagPost);
  return {
    props: {
      tagPost,
    },
  };
}