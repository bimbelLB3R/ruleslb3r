import Head from 'next/head';
import React from 'react';
import Latex from 'react-latex';

const test = () => {
  const fraction = `$$\\left (\\frac {x}{y} \\right )^2$$`;
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
          integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
          crossorigin="anonymous"
        />
      </Head>
      <div className="text-xl text-red-900">
        <Latex>{fraction}</Latex>
      </div>
    </>
  );
};

export default test;
