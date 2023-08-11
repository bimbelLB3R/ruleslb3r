// pages/video.js

import Head from "next/head";

export default function DriveVideo({ videoId }) {
  // Ganti dengan ID file video Anda
  const videoUrl = `https://drive.google.com/uc?id=${videoId}`;

  return (
    <div>
      <Head>
        <title>Video Matematika</title>
      </Head>
      <div className="w-[300px] sm:w-[525px]">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
