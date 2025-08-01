import React, { useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    description: '',
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
  const checkName = async (name) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet = doc.sheetsById[SHEET_ID]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet.getRows();

    // console.log(rows);
    const nameExists = rows.find((row) => row.name === name); //penulisan row.name , name nya harus sama dengan di google sheet name
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
      form.name !== '' &&
      form.email !== '' &&
      form.topic !== '' &&
      form.description !== ''
    ) {
      const canSubmit = await checkName(form.name, sheet);

      if (canSubmit) {
        const newRow = {
          name: form.name,
          Email: form.email,
          Topic: form.topic,
          Description: form.description,
        };
        setIsLoading(true); // set status loading menjadi true
        await appendSpreadsheet(newRow);
        setIsLoading(false); // set status loading menjadi false setelah proses selesai
        e.target.reset();

        Swal.fire({
          title: 'Saran Kamu Sudah Terkirim',
          text: 'Terima kasih telah mengirimkan saran',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        router.push('/');
      } else {
        Swal.fire({
          title: `${form.name} pernah kirim saran`,
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
        <title>Kotak Saran | Bimbel LB3R</title>
        <meta
          name="description"
          content="Kotak saran, silahkan beri masukan untuk perbaikan bimbel LB3R"
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-400 text-gray-900">
        <form
          className="space-y-3 w-full max-w-lg mx-auto p-5"
          onSubmit={submitForm}>
          <p className="font-semibold text-2xl text-center">Kotak Saran</p>
          <div>
            <input
              name="name"
              type="text"
              className=" w-full"
              placeholder="Nama Lengkap"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="email"
              type="email"
              className=" w-full"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="topic"
              type="text"
              className=" w-full"
              placeholder="Instagram Kamu"
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              name="description"
              className="form-textarea form-field-contact w-full"
              rows="3"
              placeholder="Ketik Saran"
              onChange={handleChange}
            />
          </div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            type="submit">
            {isLoading ? (
              <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
            ) : (
              'Kirim Saran' // tampilkan teks 'Submit' jika proses append selesai
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
