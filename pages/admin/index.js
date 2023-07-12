import React, { useEffect, useState } from "react";
import { getProgramsData } from "../../utils/layananApi";
import commitProgramsJSON from "../../utils/commitJson";

export async function getStaticProps() {
  const data = getProgramsData();

  return {
    props: {
      allProgram: data.programs,
    },
  };
}
export default function index({ allProgram }) {
  const [newData, setNewData] = useState({
    idProgram: "",
    nama: "",
    slug: "",
    biaya: 0,
    total: 0,
    rincian: "",
    frekuensi: "",
    fasilitas: ["", ""],
  });

  //   console.log(newData);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/layananApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Response dari API Route
        setNewData(data);
      })
      .catch((error) => {
        console.error(error);
      });
    e.target.reset();
    const commitMessage = "add json programs";
    commitProgramsJSON(commitMessage, newData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fasilitas") {
      // Untuk properti fasilitas, kita perlu memisahkan input berdasarkan koma dan menghapus spasi di sekitarnya
      const fasilitasArray = value.split(",").map((item) => item.trim());
      setNewData((prevData) => ({
        ...prevData,
        [name]: fasilitasArray,
      }));
    } else {
      setNewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  return (
    <>
      <h1 className="mt-10 flex items-center justify-center font-black text-blue-900">
        Tambah Program
      </h1>
      <div className="flex justify-center max-w-2xl m-auto mb-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col relative mt-5">
            <label className="absolute bg-yellow-200 text-gray-900   z-10 left-2 -top-2 text-xs">
              id
            </label>
            <input
              name="idProgram"
              type="text"
              placeholder="id program"
              onChange={handleChange}
              className="w-[300px] m-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute bg-yellow-200 text-gray-900   z-10 left-2 -top-2 text-xs">
              nama
            </label>
            <input
              name="nama"
              type="text"
              placeholder="nama"
              onChange={handleChange}
              className="w-[300px] m-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute bg-yellow-200 text-gray-900   z-10 left-2 -top-2 text-xs">
              slug
            </label>
            <input
              name="slug"
              type="text"
              placeholder="slug"
              onChange={handleChange}
              className="w-[300px] m-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute bg-yellow-200 text-gray-900   z-10 left-2 -top-2 text-xs">
              biaya
            </label>
            <input
              name="biaya"
              type="number"
              placeholder="biaya"
              onChange={handleChange}
              className="w-[300px] m-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute bg-yellow-200 text-gray-900   z-10 left-2 -top-2 text-xs">
              total
            </label>
            <input
              name="total"
              type="number"
              placeholder="total"
              onChange={handleChange}
              className="w-[300px] m-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute bg-yellow-200 text-gray-900   z-10 left-2 -top-2 text-xs">
              rincian
            </label>
            <input
              name="rincian"
              type="text"
              placeholder="rincian"
              onChange={handleChange}
              className="w-[300px] m-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute bg-yellow-200 text-gray-900   z-10 left-2 -top-2 text-xs">
              frekuensi
            </label>
            <input
              name="frekuensi"
              type="text"
              placeholder="frekuensi"
              onChange={handleChange}
              className="w-[300px] m-3"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="absolute bg-yellow-200 text-gray-900   z-10 left-2 -top-2 text-xs">
              fasilitas
            </label>
            <input
              name="fasilitas"
              type="text"
              placeholder="fasilitas"
              onChange={handleChange}
              className="w-[300px] m-3"
            />
          </div>
          <div className="bg-blue-600 hover:bg-blue-400 p-1 flex items-center justify-center">
            <button type="submit">
              <p className=" text-slate-50 font-bold">Submit</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
