import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

export default function PopBerita({ beritaTerbaru }) {
  //   console.log(beritaTerbaru);
  // Mengurutkan berita berdasarkan ID secara descending
  const beritaTerbaruSorted = beritaTerbaru.sort((a, b) => b.id - a.id);

  // Mengambil berita terbaru (elemen pertama setelah diurutkan)
  const beritaTerbaruIdTerbesar = beritaTerbaruSorted[0];
  // Mengambil tiga berita terakhir
  const tigaBeritaTerakhir = beritaTerbaruSorted.slice(0, 5);

  //   console.log(beritaTerbaruIdTerbesar);
  return (
    <>
      <div className="max-w-2xl grid grid-cols-1 m-auto mb-4">
        <p className="m-1 font-semibold">BERITA TERBARU</p>
        {tigaBeritaTerakhir &&
          tigaBeritaTerakhir.map((berita) => (
            <Link
              key={berita.id}
              href={`/blogs/${berita.slug}`}
              className="flex hover:bg-gray-200  space-x-1 shadow-lg  m-1 w-full"
            >
              <div className="flex items-center justify-center w-1/5">
                <Image
                  src={berita.imageUrl}
                  alt="beritaUpdate"
                  className="object-scale-down"
                  width={100}
                  height={100}
                />
              </div>

              <div className="p-2 w-4/5">
                <p className="text-sm text-gray-800">{berita.title}</p>
                <p className="text-xs text-gray-400">
                  ditulis oleh {berita.writer}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(berita.createdAt), {
                    addSuffix: true,
                    locale: id,
                  })}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
