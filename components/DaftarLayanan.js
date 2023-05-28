import React, { useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';
import Loader from './Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const DaftarLayanan = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true); // set status loading menjadi true
        await appendSpreadsheet(newRow);
        setIsLoading(false); // set status loading menjadi false setelah proses selesai
        e.target.reset();

        Swal.fire({
          title: 'Pendaftaran Berhasil',
          text: 'Biodatamu Sudah Terkirim, Lanjut Pembayaran Ya',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        router.push('/layanan/checkout');
      } else {
        Swal.fire({
          title: `${form.name} pernah terdaftar,hubungi admin.`,
          text: 'Data gagal dikirim',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
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
              className=" w-full"
              placeholder="Nama Lengkap"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="kelas"
              type="text"
              className=" w-full"
              placeholder="Kelas"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="asalsekolah"
              type="text"
              className=" w-full"
              placeholder="Asal Sekolah"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="wa"
              type="text"
              className=" w-full"
              placeholder="wa"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              className=" w-full"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="program"
              type="text"
              className=" w-full"
              placeholder="program"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="biaya"
              type="text"
              className=" w-full"
              placeholder="biaya"
              onChange={handleChange}
            />
          </div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            type="submit">
            {isLoading ? (
              <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
            ) : (
              'Daftar dan Bayar' // tampilkan teks 'Submit' jika proses append selesai
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default DaftarLayanan;
