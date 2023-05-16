import { useEffect, useState } from 'react';
import Link from 'next/link';

async function getData() {
  const res = await fetch('https://dummyjson.com/posts');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Page() {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setAllPost(data.posts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <main>
      <div>
        <h1>All Post</h1>
      </div>
      <div>
        {allPost.map((post) => (
          <div key={post.id} className="max-w-lg flex justify-center m-auto">
            <div className="p-1">
              <Link href={`/blogs/${post.id}`}>
                <h1 className="font-semibold">{post.title}</h1>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
