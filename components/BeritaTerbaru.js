import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { format, parseISO } from "date-fns";

export default function BeritaTerbaru({ allPost }) {
  return (
    <>
      <div className=" flex justify-center  font-roboto m-auto md:max-w-2xl">
        <div>
          {allPost.map((post, index) => (
            <div key={post.id} className="w-full flex justify-center m-auto">
              <Link
                href={`/blogs/${post.slug}`}
                className={
                  index !== 0
                    ? "flex items-center p-1 md:p-2 mt-1 mb-2 md:mr-5 md:ml-5 border-b-1 hover:shadow bg-slate-50 border-b-slate-300  w-full space-x-1"
                    : "p-1 md:p-2 mb-5 md:mr-5 md:ml-5 border-b-1 bg-slate-50 text-center leading-none border-b-slate-300 "
                }
              >
                <div>
                  <div className={index !== 0 ? "w-[100px]  bg-blue-400 " : ""}>
                    {index !== 0 ? (
                      <div className="absolute text-slate-100 bg-orange-600 rounded p-1 text-[8px]">
                        {post.tags}
                      </div>
                    ) : (
                      ""
                    )}

                    <div
                      className={
                        index === 0
                          ? "flex justify-center relative"
                          : "flex justify-center w-auto h-auto "
                      }
                    >
                      {index === 0 ? (
                        <p className="absolute bottom-1 bg-gray-900 text-gray-100 p-2 bg-opacity-50 font-semibold text-xl">
                          {post.title}
                        </p>
                      ) : (
                        ""
                      )}
                      <Image
                        src={post.imageUrl}
                        width={index === 0 ? 600 : 150}
                        height={index === 0 ? 300 : 150}
                        alt={post.id}
                        priority={true}
                        className=""
                      />
                    </div>
                  </div>
                </div>
                <div className={index !== 0 ? "leading-none  w-full" : ""}>
                  {index !== 0 ? (
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
                  ) : (
                    ""
                  )}
                  <div>
                    <div className={index !== 0 ? "text-sm" : "text-lg"}>
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
