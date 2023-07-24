import React from "react";

export default function Youtube({ videoId }) {
  return (
    <div className="mt-10">
      <iframe
        className="w-full sm:w-[560px] h-full sm:h-[315px]"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
