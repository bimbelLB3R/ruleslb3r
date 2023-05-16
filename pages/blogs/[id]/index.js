import { useEffect, useState } from 'react';

async function getData() {
  const res = await fetch(`https://dummyjson.com/posts/`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function PostDetail({ detailPost }) {
  //   console.log(detailPost);
  return (
    <>
      <h1>{detailPost.title}</h1>
      <p>{detailPost.body}</p>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const data = await getData();
  const allPost = data.posts;
  const postId = params.id;

  // Find the post with a matching id
  const detailPost = allPost.find((post) => post.id == postId);

  return {
    props: {
      detailPost,
    },
  };
}
