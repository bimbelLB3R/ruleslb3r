import React, { useState, useEffect, useRef } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import CardHasil from "../../components/CardHasil";
import { runFireworks } from "../../libs/utils";

const ContactForm = ({ sheetdata, biodata }) => {
  // console.log(query.link);
  // console.log(biodata);

  // console.log(sheetdata[0][1]);

  const [storedNisn, setStorageNisn] = useState("");
  // console.log(storedNisn);
  const [storedName, setStorageName] = useState("Student");
  const [tipeSoal, setTipeSoal] = useState("");
  // console.log(storedName);
  // console.log(storedNisn);
  const filteredData = sheetdata.map((item) => item);
  const filteredBiodata = biodata.map((item) => item);
  const filteredNisn = filteredData.filter((item) => item[1] === storedNisn);
  const choosenBiodata = filteredBiodata.filter(
    (item) => item[0] == storedNisn
  );
  console.log(choosenBiodata);
  // console.log(filteredNisn);
  useEffect(() => {
    runFireworks();
    // cek apakah ada name di local storage
    const storedName = localStorage.getItem("name");
    const storedNisn = localStorage.getItem("nisn");
    const tipeSoal = localStorage.getItem("tipeSoal");
    const link = localStorage.getItem("link");

    if (!storedName) {
      router.push("/form/login");
    } else {
      setStorageName(storedName);
      setStorageNisn(storedNisn);
      setTipeSoal(tipeSoal);
    }
  }, []);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Analisis Hasil UTBK SNBT | Bimbel LB3R</title>
        <meta
          name="description"
          content="Bimbel LB3R menyelenggarakan bimbingan UTBK SNBT dan memberikan latihan soal dengan metode Item Response Theory (IRT)"
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="image/logolb3r.png"
        />
      </Head>

      <main>
        <div className="max-w-xl mb-2 flex items-center justify-center m-auto p-4 bg-gray-300 text-gray-900">
          <div className="mb-12">
            <div>
              <CardHasil
                sheetdata={sheetdata}
                filteredNisn={filteredNisn}
                choosenBiodata={choosenBiodata}
                storedName={storedName}
                storedNisn={storedNisn}
                tipeSoal={tipeSoal}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactForm;

// ambil data soal
export async function getServerSideProps({ query }) {
  const link = query.link;
  const req = await fetch(`https://bimbellb3r.com/api/analisis${link}`);
  const req2 = await fetch(`https://bimbellb3r.com/api/biodata`);
  const res = await req.json();
  const res2 = await req2.json();

  return {
    props: {
      sheetdata: res.data,
      biodata: res2.data,
    },
  };
}
