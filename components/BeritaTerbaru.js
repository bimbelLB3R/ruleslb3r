import Image from 'next/image';
import Link from 'next/link';

export default function BeritaTerbaru({ allPost }) {
  return (
    <>
      <div className=" flex justify-center items-center mt-10">
        <div>
          {allPost.map((post, index) => (
            <div key={post.id} className="w-full flex justify-center m-auto">
              <div
                className={
                  index !== 0
                    ? 'flex p-2 mt-5 mb-5 mr-5 ml-5 shadow shadow-gray-400 rounded w-full'
                    : 'p-2 mt-5 mb-5 mr-5 ml-5 shadow shadow-gray-400 rounded'
                }>
                <div>
                  <Image
                    src="/image/assets/tes.webp"
                    width={index === 0 ? 600 : 300}
                    height={index === 0 ? 300 : 150}
                    alt={post.id}
                    priority={true}
                    className={index === 0 ? '' : 'w-[100px] h-[100px] '}
                  />
                </div>
                <div>
                  <div>
                    <Link href={`/blogs/${post.slug}`}>
                      <h1 className="font-semibold hover:bg-gray-300 p-1">
                        {post.title}
                      </h1>
                    </Link>
                  </div>
                  <div>Penulis : {post.writer}</div>
                  <p>{post.createdAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
