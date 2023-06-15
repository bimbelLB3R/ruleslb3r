import { useState } from "react";
import Link from "next/link";

export default function TombolCari({ allPost }) {
  const [isFocused, setIsFocused] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;

    setSearchQuery(query);
    if (query === "") {
      setSearchResults([]); // Set searchResults menjadi array kosong jika query kosong
      return;
    }

    // Lakukan pencarian pada judul dan isi artikel
    const filteredResults = allPost.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());
      const contentMatch = post.description
        .toLowerCase()
        .includes(query.toLowerCase());
      // console.log(contentMatch);
      return titleMatch || contentMatch;
    });

    setSearchResults(filteredResults);
  };

  const highlightText = (text, query) => {
    if (typeof text !== "string") {
      // Handle jika text bukan sebuah string
      return text;
    }
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.match(regex) ? <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <>
      <div className="">
        <form action="" className="relative w-max mx-auto">
          <input
            type="text"
            value={searchQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleSearch}
            className="relative peer z-10 bg-transparent w-12 h-8  border-none focus:border focus:w-full focus:border-lime-300 cursor-pointer focus:cursor-text pl-12 focus:pl-16 focus:pr-4"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-search w-12 h-8 absolute inset-y-0 my-auto px-3.5 border-r border-transparent peer-focus:border-lime-300 stroke-gray-500 peer-focus:stroke-lime-500"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </form>
        {isFocused && (
          <ul className="absolute h-[300px] overflow-y-scroll">
            {searchResults.map((post) => (
              <Link href={`/blogs/${post.slug}`} key={post.id} className="">
                <div className="p-4 bg-slate-900 text-slate-100 hover:bg-slate-400 hover:text-slate-900 ">
                  <div className="flex space-x-2 items-center">
                    <div className="border-2 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>

                    <p className="font-semibold">
                      {highlightText(post.title, searchQuery)}
                    </p>
                  </div>
                  {highlightText(post.description, searchQuery).map(
                    (part, index) => (
                      <p key={index} className="font-roboto pl-10">
                        {part}
                      </p>
                    )
                  )}
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
