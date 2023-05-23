export default function ArtikelTutorial({ allTutorial }) {
  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className="">
          <p className="font-bold">ARTIKEL TUTORIAL</p>
          <div>
            {allTutorial.slice(0, 2).map((tutorial) => (
              <p key={tutorial.id}>{tutorial.title}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
