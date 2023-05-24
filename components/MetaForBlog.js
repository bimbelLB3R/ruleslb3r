import Head from 'next/head';

export default function MetaForBlog({ detailPost }) {
  const ogTitle = detailPost.title;
  //   console.log(ogTitle);
  const ogDesc = detailPost.description;
  const ogImage = `${process.env.PUBLIC_URL}/og-images/${detailPost.ogImageName}`;
  return (
    <Head>
      <meta property="og:image" itemProp="image" content={ogImage} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:url" content={process.env.PUBLIC_URL} />
    </Head>
  );
}
