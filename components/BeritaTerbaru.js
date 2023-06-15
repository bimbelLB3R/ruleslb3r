import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { format, parseISO } from "date-fns";

export default function BeritaTerbaru({ allPost }) {
  return (
    <>
      <div className=" flex justify-center items-center mt-[50px] md:mt-10 font-roboto">
        <div>
          {allPost.map((post, index) => (
            <div key={post.id} className="w-full flex justify-center m-auto">
              <Link
                href={`/blogs/${post.slug}`}
                className={
                  index !== 0
                    ? "flex items-center p-1 md:p-2 mt-1 mb-2 md:mr-5 md:ml-5 border-b-1 hover:shadow bg-slate-50 border-b-slate-300  w-full space-x-1"
                    : "p-1 md:p-2 mt-5 mb-5 md:mr-5 md:ml-5 border-b-1 bg-slate-50 text-center leading-none border-b-slate-300 "
                }
              >
                <div>
                  <div className="absolute text-slate-100 bg-orange-600 rounded p-1 text-xs">
                    {post.tags}
                  </div>
                  <div
                    className={
                      index !== 0 ? "w-[100px]  bg-blue-400" : "md:mt-10"
                    }
                  >
                    <Image
                      src={post.imageUrl}
                      width={index === 0 ? 600 : 150}
                      height={index === 0 ? 300 : 150}
                      alt={post.id}
                      priority={true}
                      className={
                        index === 0 ? "" : "w-[100px] h-[100px] overflow-hidden"
                      }
                    />
                  </div>
                </div>
                <div className={index !== 0 ? "leading-none  w-full" : ""}>
                  <div>
                    <h1
                      className={
                        index !== 0
                          ? "font-semibold text-sm"
                          : "font-semibold text-lg"
                      }
                    >
                      {post.title}
                    </h1>
                  </div>
                  <div>
                    <div className={index !== 0 ? "text-xs" : "text-sm"}>
                      {post.description}
                    </div>
                    <p
                      className={
                        index !== 0
                          ? "text-[10px] text-slate-400 mt-4"
                          : "text-[12px] text-slate-400 mt-4 "
                      }
                    >
                      {index !== 0
                        ? formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                            locale: id,
                          })
                        : format(
                            parseISO(post.createdAt),
                            "EEEE, dd MMMM yyyy HH:mm:ss",
                            { locale: id }
                          )}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
