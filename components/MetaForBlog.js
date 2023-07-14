import Head from "next/head";

export default function MetaForBlog({ detailPost }) {
  const ogTitle = detailPost.title;
  //   console.log(ogTitle);
  const ogDesc = detailPost.description;
  const ogImage = `https://bimbellb3r.com/og-images/${detailPost.ogImageName}`;
  // console.log(ogImage);
  return (
    <Head>
      <title>{ogTitle}</title>
      <meta property="og:image" itemProp="image" content={ogImage} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:url" content={process.env.PUBLIC_URL} />
    </Head>
  );
}
