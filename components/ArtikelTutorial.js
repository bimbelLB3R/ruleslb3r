import Link from "next/link";
export default function ArtikelTutorial({ allTutorial }) {
  return (
    <>
      <div className="mt-10 flex border-l-8 p-1 m-2 mb-10 md:mb-10 border-orange-900 md:max-w-xl md:m-auto">
        <div className="">
          <p className="font-bold mb-2">ARTIKEL TUTORIAL</p>
          <div>
            {allTutorial.slice(0, 2).map((tutorial) => (
              <Link
                key={tutorial.id}
                href={`/blogs/${tutorial.slug}`}
                className="hover:underline leading-none"
              >
                <h1 className="mb-[6px] text-blue-900">{tutorial.title}</h1>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
