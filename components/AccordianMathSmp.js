import { Accordion } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";

const AccordianMathSmp = ({ allMath }) => {
  const mathSmp = allMath.filter((item, index) => item.level === "SMP");
  const data = [
    {
      judul: "Aljabar",
      namaMap: mathSmp.filter((item) => item.bab === "Aljabar"),
    },
    {
      judul: "Aritmetika Sosial",
      namaMap: mathSmp.filter((item) => item.bab === "Aritmetika Sosial"),
    },
    {
      judul: "Bilangan Bulat",
      namaMap: mathSmp.filter((item) => item.bab === "Bilangan Bulat"),
    },
  ];

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="md:max-w-2xl mb-10 overflow-hidden">
        <Accordion alwaysOpen={true}>
          {data.map((itemi, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title>
                <p className="text-orange-900">{itemi.judul}</p>
              </Accordion.Title>
              <Accordion.Content>
                <div>
                  {itemi.namaMap.map((item, index) => (
                    <div key={index}>
                      <Link
                        href={{
                          pathname: `/math/${item.slug}`,
                          query: { bab: item.bab, id: item.id },
                        }}
                        passHref
                        // href={`/math/${item.slug}`}
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
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AccordianMathSmp;
