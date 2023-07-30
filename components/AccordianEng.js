import { Accordion } from "flowbite-react";
import Link from "next/link";
const AccordianEng = ({ allEnglish }) => {
  const allGrammar = allEnglish.filter((item) => item.theme === "grammar");
  const allPro = allEnglish.filter((item) => item.theme === "pronaunciation");
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="md:max-w-2xl mb-10 overflow-hidden">
        <Accordion alwaysOpen={true}>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-orange-900">
                Pronaunciation (Pengucapan Huruf-Kata)
              </p>
            </Accordion.Title>
            <Accordion.Content>
              <div>
                {allPro.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={`/english/${item.slug}`}
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
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-orange-900">Grammar (Aturan Tata Bahasa)</p>
            </Accordion.Title>
            <Accordion.Content>
              <div>
                {allGrammar.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={`/english/${item.slug}`}
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
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-orange-900">Vocabularry (Kosa-kata)</p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                Dalam proses
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-orange-900">
                Speaking (Berbicara Bahasa Inggris)
              </p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                Dalam Proses
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-orange-900">Kumpulan E-book</p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400 text-left">
                Dalam Proses
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
};

export default AccordianEng;
