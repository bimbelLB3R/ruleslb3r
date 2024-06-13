import { Accordion } from "flowbite-react";
import Link from "next/link";

const AccordianSeminar = ({ allSeminar }) => {
//   const data = [
//     {
//       judul: "Integral",
//       namaMap: allMath.filter((item) => item.bab === "Integral"),
//     },
//     {
//       judul: "Limit dan Turunan",
//       namaMap: allMath.filter((item) => item.bab === "Limit dan Turunan"),
//     },

//     {
//       judul: "Analisis Bangun Ruang",
//       namaMap: allMath.filter((item) => item.bab === "Analisis Bangun Ruang"),
//     },
//     {
//       judul: "Aturan Sinus dan Kosinus",
//       namaMap: allMath.filter(
//         (item) => item.bab === "Aturan Sinus dan Kosinus"
//       ),
//     },
//     {
//       judul: "Barisan dan Deret",
//       namaMap: allMath.filter((item) => item.bab === "Barisan dan Deret"),
//     },
//     {
//       judul: "Fungsi Kuadrat",
//       namaMap: allMath.filter((item) => item.bab === "Fungsi Kuadrat"),
//     },
//     {
//       judul: "Komposisi Fungsi",
//       namaMap: allMath.filter((item) => item.bab === "Komposisi Fungsi"),
//     },
//     {
//       judul: "Logaritma",
//       namaMap: allMath.filter((item) => item.bab === "Logaritma"),
//     },
//     {
//       judul: "Matriks",
//       namaMap: allMath.filter((item) => item.bab === "Matriks"),
//     },
//   ];

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full md:max-w-2xl overflow-hidden">
        <Accordion alwaysOpen={true}>
          {allSeminar.map((itemi, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title>
                <p className="">{itemi.judul}</p>
              </Accordion.Title>
              <Accordion.Content>
                <div>
                  {itemi.isi}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AccordianSeminar;
