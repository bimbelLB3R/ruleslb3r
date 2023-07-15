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
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Wahyudi" />
      <meta name="keywords" content={detailPost.keyword} />
      <meta name="robots" content="index,follow" />

      {/* Telegram meta tags */}
      <meta property="article:author" content="Wahyudi" />
      <meta property="article:section" content={detailPost.tags} />
      <meta property="article:tag" content={detailPost.keyword} />

      <meta name="twitter:card" content={ogImage} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDesc} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
