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
import { getBlogsData } from '../../../utils/blogsApi';

// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/blogs`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

export default function PostDetail({ detailPost }) {
  // console.log(detailPost);
  return (
    <>
      <h1>{detailPost.title}</h1>
      <p>{detailPost.body}</p>
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
