export default function TombolCari() {
  return (
    <>
      <div className="">
        <form action="" className="relative w-max mx-auto">
          <input
            type="search"
            className="relative peer z-10 bg-transparent w-12 h12 rounded-full border-none focus:border focus:w-full focus:border-lime-300 cursor-pointer focus:cursor-text pl-12 focus:pl-16 focus:pr-4"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-search w-12 h-8 absolute inset-y-0 my-auto px-3.5 border-r border-transparent peer-focus:border-lime-300 stroke-gray-500 peer-focus:stroke-lime-500"
            viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </form>
      </div>
    </>
  );
}
