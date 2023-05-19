// import { useEffect, useState } from 'react';

// async function getData() {
//   const res = await fetch(`https://dummyjson.com/posts/`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

// export default function PostDetail({ detailPost }) {
//   //   console.log(detailPost);
//   return (
//     <>
//       <h1>{detailPost.title}</h1>
//       <p>{detailPost.body}</p>
//     </>
//   );
// }

// export async function getServerSideProps({ params }) {
//   const data = await getData();
//   const allPost = data.posts;
//   const postId = params.id;

//   // Find the post with a matching id
//   const detailPost = allPost.find((post) => post.id == postId);

//   return {
//     props: {
//       detailPost,
//     },
//   };
// }

// import { useEffect, useState } from 'react';

import Layout from '../../../components/Layout';
import { getBlogsData } from '../../../utils/blogsApi';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import Head from 'next/head';
import Sharebutton from '../../../components/Sharebutton';
import { useEffect, useState } from 'react';

// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/blogs`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

export default function PostDetail({ detailPost }) {
  const createdDate = new Date(detailPost.createdAt);
  const timeAgo = formatDistanceToNow(createdDate, {
    addSuffix: true,
    locale: id,
  });
  const pageTitle = detailPost.title;
  // console.log(detailPost);

  // membuat load more
  const [content, setContent] = useState('');
  const [displayContent, setDisplayContent] = useState('');
  const wordsPerLoad = 500;
  const [isFullContentDisplayed, setIsFullContentDisplayed] = useState(false);
  useEffect(() => {
    const body = detailPost.body;
    setContent(body);
    setDisplayContent(body.slice(0, wordsPerLoad));
  }, []);
  const handleLoadMore = () => {
    setDisplayContent(content);
    setIsFullContentDisplayed(true);
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta name="description" content={detailPost.title} key="desc" />
      </Head>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" />
      <Layout>
        <div className="p-4  mt-5 md:max-w-4xl md:flex md:justify-center md:m-auto md:mt-0">
          <div>
            <div>
              <div className="flex mb-10 font-bold mt-10 md:mt-10">
                <Link href="/blogs">
                  <p className="text-orange-600 hover:underline">Blogs </p>
                </Link>
                {' > '}
                <Link href={`/tag/${detailPost.tags}`}>
                  <p>{detailPost.tags}</p>
                </Link>
              </div>
              <div className="flex justify-center">
                <Sharebutton
                  link={`https://www.bimbellb3r.com/blogs/${detailPost.slug}`}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div>
                <h1 className="font-bold text-[36px] text-blue-900">
                  {detailPost.title}
                </h1>
                <p className="text-xs text-gray-600 text-center">
                  {timeAgo}{' '}
                  <Link href="/blogs">
                    <span className="underline">oleh {detailPost.writer}</span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <Image
                src="/image/assets/tes.webp"
                width={600}
                height={300}
                alt={detailPost.slug}
                priority={true}
              />
            </div>
            <div className="mt-4 block">
              {/* {detailPost.body} */}
              <p className="text-[17px] text-slate-900">
                <span className="font-semibold text-lg text-orange-600">
                  LB3R Info -{' '}
                </span>
                {displayContent}
              </p>
              {!isFullContentDisplayed && (
                <div className="flex justify-end">
                  <button
                    onClick={handleLoadMore}
                    className="font-semibold text-slate-400">
                    Load More {'>>>>'}
                  </button>
                </div>
              )}
            </div>
            <div className="flex">
              <Link href={`/tag/${detailPost.tags}`}>
                <p className="mt-4 bg-blue-400 hover:bg-blue-600 text-gray-100 font-semibold rounded p-1 text-xs">
                  {detailPost.tags}
                </p>
              </Link>
            </div>
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
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getBlogsData();
  const allPost = data.posts;
  const postSlug = params.slug;
  // Find the post with a matching id
  const detailPost = allPost.find((post) => post.slug == postSlug);

  return {
    props: {
      detailPost,
    },
  };
}
