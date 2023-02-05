import React, { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';
import Loader from './Loader';
import { useRouter } from 'next/router';
// import session from 'express-session';
import cookie from 'js-cookie';
import Dropdown from './DropdownTipeSoal';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID2;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID3;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const Loginmember = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    nisn: '',
    nama: '',
  });
  // cek apakah sudah ada nisn dan nama di local storage
  useEffect(() => {
    const storedNisn = localStorage.getItem('nisn');

    if (storedNisn) {
      // router.push('/form/snbt');
      localStorage.clear();
    }
  }, []);
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        // private_key: GOOGLE_SERVICE_PRIVATE_KEY,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet3 = doc.sheetsById[SHEET_ID3];
      await sheet3.addRow(row);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  // cek apakah NISN sudah ada
  const checkNisn = async (nisn) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet2 = doc.sheetsById[SHEET_ID2]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet2.getRows();

    // console.log(rows);
    const nisnExists = rows.find((row) => row.nisn === nisn); //penulisan row.name , name nya harus sama dengan di google sheet name

    // console.log(nisnExists);
    if (!nisnExists) {
      // nisn n name does not exist, form cannt be submitted

      return false;
    } else {
      // nisn already exists, form can be submitted
      return true;
    }
  };
  // cek apakah nama sudah ada end

  const submitForm = async (e, sheet3) => {
    setIsButtonDisabled(true);
    e.preventDefault();

    if (form.nisn !== '' && form.nama !== '') {
      const canSubmit = await checkNisn(form.nisn, sheet3);

      if (canSubmit) {
        const newRow = {
          nisn: form.nisn,
          nama: form.nama,
        };

        const link = localStorage.getItem('link');
        // await appendSpreadsheet(newRow);
        localStorage.setItem('name', form.nama);
        localStorage.setItem('nisn', form.nisn);
        if (link === 'snbt') {
          localStorage.setItem('timeLeft', 1800);
        } else if (link === 'kuantitatif') {
          localStorage.setItem('timeLeft', 1800);
        } else if (link === 'matematika') {
          localStorage.setItem('timeLeft', 1800);
        } else if (link === 'english') {
          localStorage.setItem('timeLeft', 15);
        } else {
          console.log('link undetect');
        }
        // localStorage.setItem('timeLeft', 1800);
        // localStorage.setItem('remainingTime', 15);
        // cookie.set('timer', '10');
        // localStorage.setItem('waktuhabis', false);

        // e.target.reset();

        // router.push(`/form/snbt`);
        router.push({
          pathname: `/form/snbt`,
          query: { link },
        });

        Swal.fire({
          title: 'Kamu Berhasil Masuk',
          text: 'Tunggu sebentar soal sedang disiapkan....',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      } else {
        Swal.fire({
          title: `${form.nisn} belum terdaftar`,
          text: 'Data gagal dikirim karena NISN kamu belum terdaftar atau nama dan NISN tidak cocok',
          icon: 'warning',
          confirmButtonText: 'Daftar',
        });
        router.push('/form/newmember');
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-18 h-12 mr-2"
            src="/image/logolb3r.png"
            alt="logo"
          />
          SNBT Program
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={submitForm}>
              <div>
                <label
                  htmlFor="nisn"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  NISN
                </label>
                <input
                  type="text"
                  name="nisn"
                  id="nisn"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="NISN Kamu"
                  required=""
                  onChange={handleChange}
                  autoComplete="off"
                />
                <p className="text-[10px] text-red-600">
                  Jika NISN kamu dimulai angka 0, misal 012345, maka tambahkan
                  angka 1 didepannya menjadi 1012345
                </p>
              </div>
              <div>
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Kamu
                </label>
                <input
                  type="nama"
                  name="nama"
                  id="nama"
                  placeholder="Nama kamu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="tipesoal"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Pilih Soal
                </label>
                <Dropdown />
              </div>
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
                      className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Forgot NISN & Name?
                </a>
              </div>
              {isButtonDisabled ? (
                <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
              ) : (
                <button
                  disabled={isButtonDisabled}
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Sign in
                </button>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a
                  href="/form/newmember"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginmember;
