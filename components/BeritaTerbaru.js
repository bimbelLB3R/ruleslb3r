import Image from 'next/image';
import Link from 'next/link';

export default function BeritaTerbaru({ allPost }) {
  return (
    <>
      <div className=" flex justify-center items-center mt-20 md:mt-10">
        <div>
          {allPost.map((post, index) => (
            <div key={post.id} className="w-full flex justify-center m-auto">
              <div
                className={
                  index !== 0
                    ? 'flex p-2 mt-1 mb-2 mr-5 ml-5 border border-b-slate-300 rounded w-full space-x-1'
                    : 'p-2 mt-5 mb-5 mr-5 ml-5 border border-b-slate-300 rounded'
                }>
                <div>
                  <Image
                    src="/image/assets/tes.webp"
                    width={index === 0 ? 600 : 300}
                    height={index === 0 ? 300 : 150}
                    alt={post.id}
                    priority={true}
                    className={
                      index === 0 ? 'rounded' : 'w-[100px] h-[100px] rounded'
                    }
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
