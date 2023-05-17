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
  // console.log(detailPost);
  return (
    <>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" />
      <Layout>
        <div className="p-4 h-screen mt-20 md:max-w-xl md:flex md:justify-center md:m-auto md:mt-20">
          <div>
            <div>
              <div className="flex mb-10">
                <Link href="/blogs">
                  <p className="text-blue-600">Blogs</p>
                </Link>
                <p>|{detailPost.title}</p>
              </div>
            </div>
            <h1 className="font-semibold text-xl">{detailPost.title}</h1>
            <p className="text-xs text-gray-600">
              {timeAgo}{' '}
              <Link href="/blogs">
                <span className="underline">by {detailPost.writer}</span>
              </Link>
            </p>

            <p className="mt-4">{detailPost.body}</p>
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
