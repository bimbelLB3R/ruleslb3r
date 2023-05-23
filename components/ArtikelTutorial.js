import Link from 'next/link';
export default function ArtikelTutorial({ allTutorial }) {
  return (
    <>
      <div className="mt-10 flex justify-center border border-l-8 p-1 m-2 border-slate-300 md:max-w-xl md:m-auto">
        <div className="">
          <p className="font-bold">ARTIKEL TUTORIAL</p>
          <div>
            {allTutorial.slice(0, 2).map((tutorial) => (
              <Link
                key={tutorial.id}
                href={`/blogs/${tutorial.slug}`}
                className="hover:underline">
                <h1>{tutorial.title}</h1>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
