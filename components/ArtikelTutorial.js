export default function ArtikelTutorial({ allTutorial }) {
  return (
    <>
      <div className="mt-20">
        <p>ARTIKEL TUTORIAL</p>
        <div>
          <p>
            {allTutorial.slice(0, 2).map((tutorial) => (
              <div>
                <p>{tutorial.title}</p>
              </div>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
