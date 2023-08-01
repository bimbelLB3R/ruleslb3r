import Link from "next/link";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Wa from "../../components/Wa";
import { getProgramsData } from "../../utils/layananApi";

import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
// mengubah mata uang
function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export async function getStaticProps() {
  const data = getProgramsData();
  const data2 = getBlogsData();
  const dataTutorial = getTutorialData();

  // console.log(data);
  return {
    props: {
      allProgram: data.programs,
      allPost: data2.posts,
      allTutorial: dataTutorial.tutorials,
    },
  };
}

export default function Layanan({ allProgram, allPost, allTutorial }) {
  // console.log(allPost);
  return (
    <>
      <Wa />
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} />
      <Layout>
        {/* <div className="flex items-center justify-center">
          <p className="mt-20 font-bold text-[20px] text-blue-600 uppercase mb-10">
            Program Bimbel LB3R
          </p>
        </div> */}

        <div className="flex items-center justify-center mt-[100px] font-roboto">
          <div className="md:flex md:flex-wrap md:justify-center">
            {allProgram.map((program, index) => (
              <div
                key={index}
                className="card bg-gradient-to-br from-rose-200/50 drop-shadow-lg m-4 p-5 border border-slate-300 md:w-[400px] w-[320px] "
              >
                <p className="font-semibold text-slate-800 tracking-wider underline underline-offset-4 decoration-4 decoration-orange-600 ">
                  {program.nama}
                </p>
                <div className="flex items-center justify-center">
                  <div>
                    <p className="text-[40px] md:text-[30px] font-bold mt-10">
                      {formatCurrency(program.biaya)}
                    </p>
                    <p className="text-center">{program.frekuensi}</p>
                  </div>
                </div>
                <ul className="leading-normal  p-3 text-slate-600">
                  {program.fasilitas.map((elemen, index) => (
                    <li className="flex items-start space-x-3" key={index}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check-lg w-[20px]"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                      </svg>
                      <p>{elemen}</p>
                    </li>
                  ))}
                </ul>
                <Link href={`/layanan/${program.slug}`}>
                  <div className="bg-slate-600 hover:bg-slate-800 mt-5 flex items-center space-x-3 justify-center rounded-full mb-10">
                    <p className="text-center font-semibold px-2 py-4 text-slate-50">
                      DAFTAR SEKARANG
                    </p>
                    <div className="text-slate-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
