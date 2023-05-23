import Image from 'next/image';
import Link from 'next/link';

export default function BeritaTerbaru({ allPost }) {
  return (
    <>
      <div className=" flex justify-center items-center mt-[50px] md:mt-10">
        <div>
          {allPost.map((post, index) => (
            <div key={post.id} className="w-full flex justify-center m-auto">
              <Link
                href={`/blogs/${post.slug}`}
                className={
                  index !== 0
                    ? 'flex items-center p-1 md:p-2 mt-1 mb-2 md:mr-5 md:ml-5 border-b-1 hover:shadow bg-slate-50 border-b-slate-300  w-full space-x-1'
                    : 'p-1 md:p-2 mt-5 mb-5 md:mr-5 md:ml-5 border-b-1 bg-slate-50 text-center leading-none border-b-slate-300 '
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
                <div className="leading-none">
                  <div>
                    <h1 className="font-semibold  p-1">{post.title}</h1>
                  </div>
                  <div>Penulis : {post.writer}</div>
                  <p>{post.createdAt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
