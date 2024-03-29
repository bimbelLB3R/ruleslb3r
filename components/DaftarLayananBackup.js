import React, { useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';
import Loader from './Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const DaftarLayanan = ({ detailProgram }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [isNamaEmpty, setIsNamaEmpty] = useState(false);
  const [isKelasEmpty, setIsKelasEmpty] = useState(false);
  const [isAsalSekolahEmpty, setIsAsalSekolahEmpty] = useState(false);
  const [isWaEmpty, setIsWaEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const namaProgram = detailProgram.nama;
  const biayaProgram = detailProgram.biaya;
  const [inputValueProgramName, setInputValueProgramName] =
    useState(namaProgram);
  const [inputValueProgramPrice, setInputValueProgramPrice] =
    useState(biayaProgram);

  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    nama: '',
    kelas: '',
    asalsekolah: '',
    wa: '',
    email: '',
    program: '',
    biaya: '',
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  // console.log(SPREADSHEET_ID);
  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        // private_key: GOOGLE_SERVICE_PRIVATE_KEY,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      await sheet.addRow(row);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  // cek apakah nama sudah ada
  const checkName = async (nama) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet = doc.sheetsById[SHEET_ID]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet.getRows();

    // console.log(rows);
    const nameExists = rows.find((row) => row.nama === nama); //penulisan row.name , name nya harus sama dengan di google sheet name
    if (!nameExists) {
      // Name does not exist, form can be submitted
      return true;
    } else {
      // Name already exists, form cannot be submitted
      return false;
    }
  };
  // cek apakah nama sudah ada end

  const submitForm = async (e, sheet) => {
    e.preventDefault();

    if (
      form.nama !== '' &&
      form.kelas !== '' &&
      form.asalsekolah !== '' &&
      form.wa !== '' &&
      form.email !== '' &&
      form.program !== '' &&
      form.biaya !== ''
    ) {
      setIsButtonDisabled(true);
      const canSubmit = await checkName(form.nama, sheet);

      if (canSubmit) {
        const newRow = {
          nama: form.nama,
          kelas: form.kelas,
          asalsekolah: form.asalsekolah,
          wa: form.wa,
          email: form.email,
          program: form.program,
          biaya: form.biaya,
        };
        // kirim ke api
        try {
          await axios.post('/api/create-transaction', newRow);
          // kirim ke api end

          // setIsLoading(true); // set status loading menjadi true, kirim ke drive
          await appendSpreadsheet(newRow);
          // setIsLoading(false); // set status loading menjadi false setelah proses selesai
          e.target.reset();

          Swal.fire({
            title: 'Pendaftaran Berhasil',
            text: 'Biodatamu Sudah Terkirim, Lanjut Pembayaran Ya',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          // Redirect to checkout page with data as query parameters
          router.push({
            pathname: '/layanan/checkout',
            query: {
              nama: form.nama,
              kelas: form.kelas,
              asalsekolah: form.asalsekolah,
              wa: form.wa,
              email: form.email,
              program: form.program,
              biaya: form.biaya,
            },
          });
          // tangkap error pengiriman ke api
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            title: 'Pendaftaran Gagal',
            text: 'Terjadi kesalahan saat mengirim data ke api',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          console.error('Error:', error);
        } finally {
          setIsButtonDisabled(false);
        }
        // tangkap error pengiriman ke api end
      } else {
        Swal.fire({
          title: `${form.nama} pernah terdaftar,hubungi admin.`,
          text: 'Data gagal dikirim',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      setIsNamaEmpty(form.nama === '');
      setIsKelasEmpty(form.nama === '');
      setIsAsalSekolahEmpty(form.nama === '');
      setIsWaEmpty(form.nama === '');
      setIsEmailEmpty(form.nama === '');
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Lengkapi Data</title>
        <meta name="description" content="Formulir Pendaftaran" key="desc" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="image/logolb3r.png"
        />
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-400 text-gray-900">
        <form
          className="space-y-3 w-full max-w-lg mx-auto p-5"
          onSubmit={submitForm}>
          <p className="font-semibold text-2xl text-center">Lengkapi Data</p>
          <div>
            <input
              name="nama"
              type="text"
              className={`w-full ${isNamaEmpty ? 'border-red-500' : ''}`}
              placeholder="Nama Lengkap"
              onChange={handleChange}
              onBlur={() => {
                if (form.nama === '') {
                  setIsNamaEmpty(true);
                } else {
                  setIsNamaEmpty(false);
                }
              }}
            />
            {isNamaEmpty && <p className="text-red-500 text-xs">Wajib diisi</p>}
          </div>
          <div>
            <input
              name="kelas"
              type="text"
              className={`w-full ${isKelasEmpty ? 'border-red-500' : ''}`}
              placeholder="Kelas"
              onChange={handleChange}
              onBlur={() => {
                if (form.kelas === '') {
                  setIsKelasEmpty(true);
                } else {
                  setIsKelasEmpty(false);
                }
              }}
            />
            {isKelasEmpty && (
              <p className="text-red-500 text-xs">Wajib diisi</p>
            )}
          </div>
          <div>
            <input
              name="asalsekolah"
              type="text"
              className={`w-full ${isAsalSekolahEmpty ? 'border-red-500' : ''}`}
              placeholder="Asal Sekolah"
              onChange={handleChange}
              onBlur={() => {
                if (form.asalsekolah === '') {
                  setIsAsalSekolahEmpty(true);
                } else {
                  setIsAsalSekolahEmpty(false);
                }
              }}
            />
            {isAsalSekolahEmpty && (
              <p className="text-red-500 text-xs">Wajib diisi</p>
            )}
          </div>
          <div>
            <input
              name="wa"
              type="text"
              className={`w-full ${isWaEmpty ? 'border-red-500' : ''}`}
              placeholder="wa"
              onChange={handleChange}
              onBlur={() => {
                if (form.wa === '') {
                  setIsWaEmpty(true);
                } else {
                  setIsWaEmpty(false);
                }
              }}
            />
            {isWaEmpty && <p className="text-red-500 text-xs">Wajib diisi</p>}
          </div>
          <div>
            <input
              name="email"
              type="email"
              className={`w-full ${isEmailEmpty ? 'border-red-500' : ''}`}
              placeholder="email"
              onChange={handleChange}
              onBlur={() => {
                if (form.email === '') {
                  setIsEmailEmpty(true);
                } else {
                  setIsEmailEmpty(false);
                }
              }}
            />
            {isEmailEmpty && (
              <p className="text-red-500 text-xs">Wajib diisi</p>
            )}
          </div>
          <p>CENTANG PILIHAN PROGRAM DAN BIAYA</p>
          <div className="flex items-center space-x-2">
            <input
              name="program"
              type="checkbox"
              className=""
              placeholder="program"
              onChange={handleChange}
              readOnly
              value={inputValueProgramName}
            />
            <p>{inputValueProgramName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              name="biaya"
              type="checkbox"
              className=""
              placeholder="biaya"
              onChange={handleChange}
              readOnly
              value={inputValueProgramPrice}
            />
            <p>
              {inputValueProgramPrice} {detailProgram.rincian}
            </p>
          </div>

          {/* <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            type="submit">
            {isLoading ? (
              <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
            ) : (
              'Daftar dan Bayar' // tampilkan teks 'Submit' jika proses append selesai
            )}
          </button> */}
          {isButtonDisabled ? (
            <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
          ) : (
            <button
              disabled={isButtonDisabled}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Daftar dan Bayar Sekarang
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default DaftarLayanan;
