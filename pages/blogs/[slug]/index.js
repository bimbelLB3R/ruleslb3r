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
import IklanKonten from '../../../components/IklanKonten';
import React from 'react';
import ArtikelTerkait from '../../../components/ArtikelTerkait';
// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/blogs`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

export default function PostDetail({ detailPost, allPost }) {
  const [showComponent, setShowComponent] = useState(false);
  // agar tanggal publikasi konten terindeks google
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bimbellb3r.com/${detailPost.slug}`,
    },
    headline: detailPost.title,
    datePublished: detailPost.createdAt,
    dateModified: detailPost.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Wahyudi',
    },
  };
  // Controling scroll efect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // console.log(scrollPosition);
      if (scrollPosition > 120) {
        setShowComponent(true);
      } else {
        setShowComponent(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // membuat waktu
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" />
      <Layout>
        <div
          className={
            showComponent
              ? 'visible  md:top-10 p-5 md:p-0 md:bg-inherit z-20 md:z-50  fixed top-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              : 'hidden'
          }>
          <Sharebutton />
        </div>
        <div className="p-4  mt-5 md:max-w-2xl md:flex md:justify-center md:m-auto md:mt-0">
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
                <h1 className="font-bold text-[36px] text-blue-900 leading-none">
                  {detailPost.title}
                </h1>
                <p className="text-xs text-gray-600 text-center">
                  {detailPost.createdAt}{' '}
                  <Link href="/blogs">
                    <span className="underline">oleh {detailPost.writer}</span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center mb-5">
              <Image
                src="/image/assets/tes.webp"
                width={600}
                height={300}
                alt={detailPost.slug}
                priority={true}
              />
            </div>
            <div>
              <div>
                {detailPost.body.map((element, index) => {
                  if (typeof element === 'string') {
                    return (
                      <div
                        key={index}
                        dangerouslySetInnerHTML={{ __html: element }}
                      />
                    );
                  } else if (
                    typeof element === 'object' &&
                    element.type === 'IklanKonten'
                  ) {
                    return <IklanKonten key={index} />;
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className="flex">
              <Link href={`/tag/${detailPost.tags}`}>
                <p className="mt-4 bg-blue-400 hover:bg-blue-600 text-gray-100 font-semibold rounded p-1 text-xs">
                  {detailPost.tags}
                </p>
              </Link>
            </div>
            <div className="mt-5">
              <ArtikelTerkait allPost={allPost} detailPost={detailPost} />
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
      allPost,
    },
  };
}
