import React, { useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    description: '',
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
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

        appendSpreadsheet(newRow);
        e.target.reset();

        Swal.fire({
          title: 'Saran Kamu Sudah Terkirim',
          text: 'Terima kasih telah mengirimkan saran',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
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
          className="bg-green-200 px-3 py-1 font-semibold shadow-md rounded-md"
          type="submit">
          Kirim Saran
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
