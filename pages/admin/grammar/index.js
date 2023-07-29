import Link from "next/link";
import { getGrammarData } from "../../../utils/grammarApi";

export async function getStaticProps() {
  const data = getGrammarData();
  return {
    props: {
      allGrammar: data.grammar,
    },
  };
}

export default function index({ allGrammar }) {
  //   console.log(allGrammar);
  return (
    <div className="p-4 sm:p-0 w-full md:max-w-xl sm:flex sm:items-center sm:justify-center sm:m-auto">
      <div>
        <h1 className="font-bold text-center uppercase">Grammar</h1>
        <div className="">
          {allGrammar.map((item, index) => (
            <div key={index}>
              <Link
                href={`/admin/english/grammar/${item.slug}`}
                className="flex items-center space-x-2 border-b-2 m-3"
              >
                <div>
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
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                </div>
                <div>{item.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
