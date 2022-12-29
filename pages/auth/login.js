import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import cookies from 'next-cookies';
import { unauthPage } from '../../libs/middlewares/authorizationPage';

// mengambil cookies dari server
export async function getServerSideProps(ctx) {
  //const allCookies = cookies(ctx); //lihat dokumentasi
  // console.log(allCookies.token);
  // Jika sudah ada token (ttrue), langsung aja ke posts
  //if (allCookies.token)
  //   ctx.res
  //     .writeHead(302, {
  //       Location: '../posts', //redirect
  //     })
  //     .end();
  await unauthPage(ctx);
  return { props: {} };
}

export default function Login() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('');
  //mendeteksi perubahan saat didmount(saat dimuat).jika tdk diberi emty array, maka tiap perubahan akan diupdate.dengan array ini hanya perubahan/muatan pertama yg dideteksi
  //useEffect(() => {
  // console.log('update');
  // mengambil token dari cokie yg tersimpan dibrowser
  //const token = Cookie.get('token');
  // console.log(token);
  //if (token) return Router.push('../posts');
  //}, []);
  async function loginHandler(e) {
    e.preventDefault();
    setStatus('loading....');
    const loginReq = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!loginReq.ok) return setStatus('error' + loginReq.status);
    const loginRes = await loginReq.json();
    // console.log(loginRes);
    setStatus('Berhasil'); //jika loginRes berhasil akan mendapat token

    // Membuat Cookie. Untuk mencek cookie, ketik document.cookie di console log
    Cookie.set('token', loginRes.token);

    // Redirect ke halaman posts/index
    Router.push('../posts');
  }
  function fieldHandler(e) {
    const name = e.target.getAttribute('name');
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }
  return (
    <div>
      <div>
        <form
          onSubmit={loginHandler.bind(this)}
          className="flex flex-col justify-center max-w-lg m-auto items-center h-screen p-2">
          <input
            className="bg-gray-100 m-2 p-2"
            name="email"
            type="text"
            placeholder="Email"
            onChange={fieldHandler.bind(this)}
          />
          <input
            className="bg-gray-100 m-2 p-2"
            name="password"
            type="password"
            placeholder="Password"
            onChange={fieldHandler.bind(this)}
          />
          <button type="submit" className="bg-blue-600 rounded p-2">
            Login
          </button>
          <p>{status}</p>
        </form>
      </div>
    </div>
  );
}
