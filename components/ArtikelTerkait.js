import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function ArtikelTerkait({ allPost, detailPost }) {
  // membuat waktu
  const currentDate = new Date();

  const tagToFilter = detailPost.tags;
  const maxResults = 4;
  const filteredPost = allPost
    .filter((item) => item.tags == tagToFilter)
    .slice(0, maxResults);
  // console.log(filteredPost);
  return (
    <>
      <>
        <section>
          <p className="font-bold">Artikel Terkait</p>
          <div
            className={
              filteredPost.length < 2
                ? ""
                : " border-l-8 border-slate-300 p-1 m-2"
            }
          >
            {filteredPost.map((item) => {
              const createdDate = new Date(item.createdAt);
              const timeAgo =
                createdDate < currentDate
                  ? formatDistanceToNow(createdDate, {
                      addSuffix: true,
                      locale: id,
                    })
                  : formatDistanceToNow(createdDate, { locale: id });

              return (
                <div key={item.id}>
                  {item.id !== detailPost.id && (
                    <div className="m-2">
                      <Link href={`/blogs/${item.slug}`}>
                        <p className="text-blue-900">{item.title}</p>
                        <p className="text-xs">Dibuat {timeAgo}</p>
                        <p className="text-xs">
                          Oleh {item.writer}-Penulis LB3R
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </>
    </>
  );
}
