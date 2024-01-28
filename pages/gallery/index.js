import { useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
import "animate.css";
import Head from "next/head";
import Image from "next/image";

export default function Gallery({ feed, allPost }) {
  const [selectedMediaType, setSelectedMediaType] = useState("IMAGE");
  const [selectedMediaType2, setSelectedMediaType2] = useState("IMAGE");
  // console.log(feed);
  const images = feed.data;
  const filteredImages = images.filter(
    (image) => image.media_type === selectedMediaType
  );
  const filteredImages2 = images.filter(
    (image) => image.media_type === selectedMediaType2
  );
  return (
    <>
      <Head>
        <title>Galeri Foto & Video</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Galeri foto dan video (dokumentasi) LB3R"
          key="desc"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://raw.githubusercontent.com/bimbelLB3R/ruleslb3r/main/public/image/image1.webp"
        />
      </Head>
      <Navbar allPost={allPost} />
      <div className="flex justify-center space-x-4 p-2 border mt-[120px]">
        <button
          onClick={() => {
            setSelectedMediaType("IMAGE");
          }}
          className={` ${
            selectedMediaType === "IMAGE" ? "text-orange-600" : ""
          } `}
        >
          Images
        </button>
        <button
          onClick={() => {
            setSelectedMediaType("VIDEO"), setSelectedMediaType2("");
          }}
          className={` ${
            selectedMediaType === "VIDEO" ? "text-orange-600" : ""
          } `}
        >
          Video
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mt-10 px-6 sm:px-6 gap-5 sm:gap-10 mx-auto">
        {filteredImages.map((image) => (
          <div key={image.id}>
            {selectedMediaType === "IMAGE" ? (
              <Image
                className="object-cover aspect-square rounded-sm filter grayscale hover:filter-none transition duration-200"
                src={image.media_url}
                alt={image.caption}
                width={500}
                height={500}
                priority={true}
              />
            ) : (
              <div>
                <video
                  className=""
                  controls
                  src={image.media_url}
                  alt={image.caption}
                  type="video/mp4"
                />
              </div>
            )}
          </div>
        ))}
        {/* {filteredImages2.map((image2) => (
          <div key={image2.id}>
            {selectedMediaType2 === "VIDEO" ? (
              <video
                className=""
                controls
                src={image2.media_url}
                alt={image2.caption}
                type="video/mp4"
              />
            ) : (
              <div>
                <img
                  className="object-cover aspect-square rounded-sm filter grayscale hover:filter-none transition duration-200"
                  src={image2.media_url}
                  alt={image2.caption}
                />
              </div>
            )}
          </div>
        ))} */}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.IG_TOKEN}`;
  const data = await fetch(url);
  const feed = await data.json();
  const dataBlog = getBlogsData();
  const dataTutorial = getTutorialData();
  return {
    props: {
      feed,
      allPost: dataBlog.posts,
      allTutorial: dataTutorial.tutorials,
    },
  };
};

// tiap 60 hari token harus diganti , https://youtu.be/kLFSTaCqzdQ?si=7DAVLU2YVA6G5J8q
