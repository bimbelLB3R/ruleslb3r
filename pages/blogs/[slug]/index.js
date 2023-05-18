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

export default function PostDetail({ detailPost }) {
  const createdDate = new Date(detailPost.createdAt);
  const timeAgo = formatDistanceToNow(createdDate, {
    addSuffix: true,
    locale: id,
  });
  const pageTitle = detailPost.title;
  // console.log(detailPost);
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
        <div className="p-4 h-screen mt-5 md:max-w-xl md:flex md:justify-center md:m-auto md:mt-20">
          <div>
            <div>
              <div className="flex mb-10 font-bold mt-10">
                <Link href="/blogs">
                  <p className="text-orange-600 hover:underline">Blogs </p>
                </Link>
                {' > '}
                <Link href={`/tag/${detailPost.tags}`}>
                  <p>{detailPost.tags}</p>
                </Link>
              </div>
            </div>
            <h1 className="font-bold text-2xl">{detailPost.title}</h1>
            <p className="text-xs text-gray-600">
              {timeAgo}{' '}
              <Link href="/blogs">
                <span className="underline">oleh {detailPost.writer}</span>
              </Link>
            </p>

            <p className="mt-4">
              <span className="font-semibold text-lg text-orange-600">
                LB3R Info -{' '}
              </span>
              {detailPost.body}
            </p>
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
