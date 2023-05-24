import Head from 'next/head';

export default function MetaForBlog({ detailPost }) {
  const ogTitle = detailPost.title;
  //   console.log(ogTitle);
  const ogDesc = detailPost.description;
  const ogImage = `${process.env.PUBLIC_URL}/og-images/${detailPost.ogImageName}`;
  const ogUrl = detailPost.slug;
  return (
    <Head>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={`/blogs/${ogUrl}`} />
      <meta property="og:type" content="article" />
    </Head>
  );
}
