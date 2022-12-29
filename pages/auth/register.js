import React, { useState } from 'react';
import { unauthPage } from '../../libs/middlewares/authorizationPage';

// authorisasi halaman register
export async function getServerSideProps(ctx) {
  await unauthPage(ctx);
  return { props: {} };
}
export default function Register() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  //   membuat state status
  const [status, setStatus] = useState('normal');

  async function registerHandler(e) {
    e.preventDefault();
    //console.log(fields); //cek isi fields default

    // ketika loading
    setStatus('loading....');

    // kirim data ke api/auth/register menggunakan fetch (asyncronous), shg fungsi registerHandler ditambah async
    const registerReq = await fetch('/api/auth/register', {
      //api/auth/register adalah endpoint yg dituju.
      // parameter kedua dari fetch adalah option
      method: 'POST',
      body: JSON.stringify(fields), //fields merupakan objek shg diubah jd json string
      headers: {
        'Content-Type': 'application/json',
      }, //header berfungsi untuk memberitahu bahwa  request body berupa string json. tanpa ini muncul error.
    });

    // set status ketika requwes data error
    if (!registerReq.ok) return setStatus('error' + registerReq.status);

    const registerRes = await registerReq.json(); //mengambil respon body dan mengubah mjd json
    console.log(registerRes);

    // mengubah status ketika data berhasil
    setStatus('Berhasil');
  }
  function fieldHandler(e) {
    // console.log(e.target.getAttribute('name'));mendeteksi perubahan disetiap field berdasar nama attribut.
    const name = e.target.getAttribute('name');
    setFields({
      ...fields, //spread operator berfungsi menggabungkan data sebelumnya dengan data yg diubah. tanpa spread operator, data field yang keluar cuman data terakhir yg berubah.
      [name]: e.target.value, //name dibuat [] supaya dinamis
    });
  }
  return (
    <div>
      <h1>Registrasi Siswa Baru</h1>
      <form onSubmit={registerHandler.bind(this)}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={fieldHandler.bind(this)}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          onChange={fieldHandler.bind(this)}
        />
        <button type="submit">Register</button>
        <p>data {status} diinput</p>
      </form>
    </div>
  );
}
