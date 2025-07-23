import React, { useEffect, useState} from "react";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
// import session from 'express-session';
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import "animate.css";
import Image from "next/image";
// from timer
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
// import { createClient } from "@supabase/supabase-js";
import { supabase } from "../libs/supabase";
import Link from "next/link";
import Dropdowntka from "./DropdownTipeSoalTka";
import Dropdownjenjang from "./DropdownJenjang";


dayjs.extend(duration);
// from timer end
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Loginmembertka = () => {
  const [erorKoneksi,setErorKoneksi]=useState(false);
  const { data: session } = useSession();
  // console.log(session);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    nisn: "",
    nama: "",
  });
  // console.log(form.nisn);
  // cek apakah sudah ada nisn dan nama di local storage
        useEffect(() => {
        const link = localStorage.getItem("link");
        const storedMaxTime = localStorage.getItem("maxTime");
        const jenisUjian = localStorage.getItem("jenisUjian");

        const maxTimeInSeconds = parseInt(storedMaxTime);
        const currentTime = dayjs();
        const startTime = localStorage.getItem("startTime")
          ? dayjs(localStorage.getItem("startTime"))
          : currentTime;

        const elapsedTime = currentTime.diff(startTime, "second");
        const remainingTime = Math.max(0, maxTimeInSeconds - elapsedTime);

        if (remainingTime > 0) {
          let pathname = "";

          if (jenisUjian === "tka") {
            pathname = `/form/tkasupa`;
          } else if (jenisUjian === "snbt") {
            pathname = `/form/snbtsupa`;
          } else if (jenisUjian === "diagnostik") {
            pathname = `/layanan/diagnostik/diagnostiktes`;
          } else {
            console.log("Jenis ujian tidak terdeteksi, silahkan mulai soal");
            return; // stop push kalau tidak valid
          }

          router.push({
            pathname: pathname,
            query: { link },
          });
        } else {
          console.log("Silahkan mulai soal");
        }
      }, [router]);

  // cek apakah NISN sudah ada+penanganan eror koneksi buruk
  const cekPeserta=async(nisn)=>{
    try {
        const { data, error } = await supabase
          .from("peserta_snbt")
          .select("nisn")
          .eq("nisn", `1${nisn}`)
          .maybeSingle();
    
        if (error) throw new Error(error.message);
        
        return !!data;
      } catch (error) {
        console.error("Error fetching data:", error.message);
        return false;
      }
  }
  // penanganan submit dan handle eror ketika koneksi buruk atau blm terdaftar
  const submitForm = async (e) => {
    setIsButtonDisabled(true);
    e.preventDefault();
  
    try {
      if (form.nisn !== "" && form.nama !== "") {
        const canSubmit = await cekPeserta(form.nisn);
  
        if (canSubmit === null) {
          // Jika checkNisn gagal karena error (misalnya jaringan), tampilkan pesan error
          Swal.fire({
            title: "Koneksi Bermasalah",
            text: "Gagal memeriksa NISN. Pastikan koneksi internet stabil dan coba lagi.",
            icon: "error",
            confirmButtonText: "Coba Lagi",
          });
          return; // Jangan lanjutkan eksekusi
        }
  
      if (canSubmit) {
          localStorage.setItem("jenisUjian","tka");
          const link = localStorage.getItem("link");
          const jenjang = localStorage.getItem("jenjang");
          localStorage.setItem("name", form.nama);
          localStorage.setItem("nisn", `1${form.nisn}`);

          // 1. Definisi dataSoal per jenjang (wajib)
          const soalPerJenjang = {
            sd: ["matsd", "bindosd"],
            smp: ["matsmp", "bindosmp"],
            sma: ["mattka", "indtka", "engtka"],
          };

          // 2. Definisi maxTimeMapping per jenjang
          const maxTimeMappingPerJenjang = {
            sd: {
              matsd: 1200,
              bindosd: 1500,
            },
            smp: {
              matsmp: 1500,
              bindosmp: 1800,
            },
            sma: {
              mattka: 1200,
              indtka: 2250,
              engtka: 1800,
              bindolanjut: 1800,
              binglanjut: 1800,
              fisika: 1500,
              kimia: 1500,
              biologi: 1500,
              ekonomi: 1500,
              geografi: 1500,
              sosiologi: 1500,
              sejarah: 1500,
              jepang: 1500,
            },
          };

          // 3. Ambil mapel wajib sesuai jenjang
          let dataSoal = soalPerJenjang[jenjang] || [];

          // 4. Kalau jenjang SMA → ambil mapelPilihanSiswa dari localStorage
          if (jenjang === "sma") {
            const mapelPilihanSiswa = JSON.parse(localStorage.getItem("mapelPilihanSiswa")) || [];
            // Pastikan hanya max 2
            const duaMapel = mapelPilihanSiswa.slice(0, 2);
            dataSoal = [...dataSoal, ...duaMapel];
          }

          // 5. Simpan final dataSoal
          localStorage.setItem("dataSoal", JSON.stringify(dataSoal));

          // 6. Atur maxTime sesuai link
          const maxTimeMapping = maxTimeMappingPerJenjang[jenjang] || {};
          if (link in maxTimeMapping) {
            localStorage.setItem("maxTime", maxTimeMapping[link]);
          } else {
            console.log("Link undetect atau waktu tidak tersedia");
          }

          router.push({
            pathname: `/form/tkasupa`,
            query: { link },
          });

        } else {
          Swal.fire({
            title: `${form.nisn} belum terdaftar`,
            text: "Data gagal dikirim karena NISN kamu belum terdaftar",
            icon: "warning",
            confirmButtonText: "Daftar",
          });
          router.push("/form/newmembersup");
        }


      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      Swal.fire({
        title: "Terjadi Kesalahan",
        text: "Ada masalah dalam proses pendaftaran. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "Oke",
      });
    } finally {
      // Pastikan tombol tidak tetap dinonaktifkan jika terjadi error
      setIsButtonDisabled(false);
    }
  };
  
  // penanganan submit dan handle eror ketika koneksi buruk atau blm terdaftar end

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleReset=()=>{
    localStorage.clear();
    window.location.reload(); // Refresh halaman jika perlu
  }
  
  return (
    <>
      <Head>
        <title>Try Out dan Simulai TKA</title>
        <meta name="description" content="Halaman Login Simulasi dan Try Out Program TKA Bimbel LB3R" />
        <meta
      property="og:image"
      itemProp="image"
      content="https://raw.githubusercontent.com/bimbelLB3R/bimbellb3r.github.io/main/img/slider/og.jpg"
    />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="../image/logolb3r.png"
        />
      </Head>

      <div className="bg-gray-50 dark:bg-gray-900 h-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0 animate__animated  animate__slideInDown ">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white "
          >
            {/* <img
              className="w-18 h-12 mr-2"
              src="/image/logolb3r.png"
              alt="logo"
            /> */}
            <Image
            src="/image/logolb3r.png"
            width={72}
            height={48}
            alt="logo"
            priority={true}
            className="mr-2"
            />
            Premium Member
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {session ? (
                <div className="flex items-center justify-center ">
                  <div className="border-2 border-white rounded-full relative shadow-md">
                    <Image
                      src={session.user.image}
                      width={72}
                      height={72}
                      alt="userFoto"
                      priority={true}
                      className="rounded-full shadow-2xl"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Premium Member
              </h1>
              <p>{erorKoneksi&&"Koneksi internet kamu kurang bagus..!!"}</p>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={(e) => submitForm(e)}
              >
                <div>
                  <label
                    htmlFor="nisn"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NISN
                  </label>
                  <input
                    type="number"
                    name="nisn"
                    id="nisn"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="NISN Kamu"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isButtonDisabled}
                  />
                </div>
                <div>
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Panggilanmu
                  </label>
                  <input
                    type="nama"
                    name="nama"
                    id="nama"
                    placeholder="Nama panggilan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isButtonDisabled}
                  />
                </div>
                <div>
                  <Dropdownjenjang disabled={isButtonDisabled} />
                </div>
                {/* <div>
                  <Dropdowntka disabled={isButtonDisabled} />
                </div> */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/6281392552459"
                    target="_blank"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot NISN & Name?
                  </a>
                </div>
                {isButtonDisabled ? (
                  <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
                ) : (
                  <button
                    disabled={isButtonDisabled}
                    // disabled={true} //non aktifkan sementara
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Mulai Kerjakan
                  </button>
                )}
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/form/newmembersup?jenisujian=tka"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a> or {" "}
                  <button type="button" className="underline" onClick={handleReset}>Reset</button> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginmembertka;

