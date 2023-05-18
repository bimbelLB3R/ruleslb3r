// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// async function getData() {
//   const res = await fetch('https://dummyjson.com/posts');

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

// export default function Page() {
//   const [allPost, setAllPost] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getData();
//         setAllPost(data.posts);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <main>
//       <div className="flex items-center justify-center m-auto text-xl font-black">
//         <h1>All Post</h1>
//       </div>
//       <div>
//         {allPost.map((post) => (
//           <div key={post.id} className="max-w-lg flex justify-center m-auto">
//             <div className="p-1 ">
//               <Link href={`/blogs/${post.id}`}>
//                 <h1 className="font-semibold hover:bg-gray-300 p-1">
//                   {post.title}
//                 </h1>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// import Link from 'next/link';

// export default function Page({ allPost, posts }) {
//   console.log(posts);
//   return (
//     <main>
//       <div className="flex items-center justify-center m-auto text-xl font-black">
//         <h1>All Post</h1>
//       </div>
//       <div>
//         {allPost.map((post) => (
//           <div key={post.id} className="max-w-lg flex justify-center m-auto">
//             <div className="p-1 ">
//               <Link href={`/blogs/${post.id}`}>
//                 <h1 className="font-semibold hover:bg-gray-300 p-1">
//                   {post.title}
//                 </h1>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// export async function getStaticProps() {
//   const res = await fetch(`https://localhost:3000/api/blogs`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   const data = await res.json();
//   const allPost = data.posts;

//   return {
//     props: {
//       allPost,
//     },
//   };
// }

import Layout from '../../components/Layout';
import { getBlogsData } from '../../utils/blogsApi';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Head from 'next/head';
import Image from 'next/image';

export async function getStaticProps() {
  const data = getBlogsData();

  return {
    props: {
      allPost: data.posts,
    },
  };
}

export default function BlogsPage({ allPost }) {
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
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" />
      <Layout>
        <div className=" flex justify-center items-center">
          <div>
            <div className="max-w-lg flex justify-center mt-20">
              <h1 className="text-xl font-black ">LB3R BLOGS</h1>
            </div>

            {allPost.map((post) => (
              <div key={post.id} className="w-full flex justify-center m-auto">
                <div className="p-2 mt-5 mb-5 mr-5 ml-5 shadow shadow-gray-400 rounded">
                  <div>
                    <Image
                      src="/image/assets/tes.webp"
                      width={600}
                      height={300}
                      alt={post.id}
                    />
                  </div>
                  <div>
                    <Link href={`/blogs/${post.slug}`}>
                      <h1 className="font-semibold hover:bg-gray-300 p-1">
                        {post.title}
                      </h1>
                    </Link>
                  </div>
                  <div>Penulis : {post.writer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
