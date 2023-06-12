import React, { useState, useEffect } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// mengubah mata uang
function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID3RULESLB3R; //cek token
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID2RULESLB3R; //pos nama dan data
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const BayarLes = () => {
  // const [qrisUrl, setQrisUrl] = useState('');
  // console.log(qrisUrl);
  // // mencoba akses endpoin midtrans dengn useeffect, blm berhasil dan not recomended krn hrs req body
  // useEffect(() => {
  //   // Panggil API atau sumber data lainnya untuk mendapatkan JSON
  //   const fetchQrisUrl = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://app.midtrans.com/snap/v1/transactions/${transactionToken}`
  //       ); // Ganti 'API_ENDPOINT' dengan URL endpoint yang sesuai
  //       const data = await response.json();
  //       const qrisUrl = data.result.qris_url;
  //       setQrisUrl(qrisUrl);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchQrisUrl();
  // }, []);

  const [isReadOnly, setIsReadOnly] = useState(false);

  const tanggalSekarang = new Date();
  const bulanSekarang = format(tanggalSekarang, 'MMMM', { locale: id });

  const [namaKamu, setNamaKamu] = useState(false);
  //   const timestamp = new Date().toISOString();
  const getFormattedTimestamp = () => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };

    const timestamp = new Date().toLocaleString('id-ID', options);
    return timestamp;
  };

  // Contoh penggunaan
  const timestamp = getFormattedTimestamp();
  //   console.log(timestamp);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isTokenEmpty, setIsTokenEmpty] = useState(false);
  const [isnamalengkapEmpty, setIsnamalengkapEmpty] = useState(false);
  const [iswaEmpty, setIswaEmpty] = useState(false);
  const [isbulanEmpty, setIsbulanEmpty] = useState(false);
  const [isjumlahEmpty, setIsjumlahEmpty] = useState(false);
  const [istimestampEmpty, setIstimestampEmpty] = useState(false);
  const [iskalipembayaranEmpty, setIskalipembayaranEmpty] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    token: '',
    namalengkap: '',
    wa: '',
    bulan: '',
    jumlah: '',
    timestamp: '',
    kalipembayaran: '',
    pesan: '',
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

      const sheet = doc.sheetsById[SHEET_ID2]; //pos data
      await sheet.addRow(row);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  // cek apakah token sudah ada
  const checkToken = async (token) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet = doc.sheetsById[SHEET_ID]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet.getRows();

    // console.log(rows);
    const tokenExists = rows.find((row) => row.token === token); //penulisan row.name , name nya harus sama dengan di google sheet name
    // const AmbilToken = tokenExists ? [tokenExists].map((row) => row.token) : [];
    // const token = AmbilToken[0];
    const namalengkap = tokenExists ? tokenExists.namalengkap : null;

    if (tokenExists) {
      // Name does not exist, form can be submitted
      const inputNamaLengkap = document.getElementById('inputNamaLengkap');
      inputNamaLengkap.value = namalengkap;

      return tokenExists;
    } else {
      // Name already exists, form cannot be submitted
      return null;
    }
  };
  // cek apakah nama sudah ada end

  const submitForm = async (e, sheet) => {
    e.preventDefault();

    if (
      form.token !== '' &&
      form.namalengkap !== '' &&
      form.wa !== '' &&
      form.bulan !== '' &&
      form.jumlah !== '' &&
      form.timestamp !== '' &&
      form.kalipembayaran !== ''
    ) {
      setIsButtonDisabled(true);
      const canSubmit = await checkToken(form.token, sheet);

      if (canSubmit) {
        const newRow = {
          token: form.token,
          namalengkap: form.namalengkap,
          wa: form.wa,
          bulan: form.bulan,
          jumlah: form.jumlah,
          timestamp: form.timestamp,
          kalipembayaran: form.kalipembayaran,
          pesan: form.pesan,
        };
        // 1.mengirim permintaan ke api/create-transaction dan mengirim data newrow sekalian
        // 2.Request token ke end poin mid trans
        // 3.Handle submit ke sheet dan membuat tombol bayar

        // const createTransaction = async (newRow) => {
        //   try {
        //     const response = await axios.post(
        //       '/api/create-transaction-bayarles',
        //       newRow
        //     );
        //     const transactionToken = response.data.transactionToken;
        //     const transactionRedirectUrl = response.data.transactionRedirectUrl;
        //     // console.log('transactionToken:', transactionToken);
        //     // console.log('redirectUrl:', transactionRedirectUrl);

        //     return transactionToken;
        //     //jangan return directUrl krn token: transactionToken bisa terisi url tsb. solusinya kembalikan token, ubah router push linknya
        //   } catch (error) {
        //     console.error('Failed to create transaction:', error);
        //     return null;
        //   }
        // };
        // const transactionToken = await createTransaction(newRow);
        // const transactionRedirectUrl = await createTransaction(newRow);
        // console.log(transactionToken); //token berhasil
        // console.log(transactionRedirectUrl); //token berhasil

        // Get Info dari token yang diperoleh diganti menggunakan newRow
        // const token = { token: transactionToken }; //bener
        // const getInfoTransaksi = async (token) => {
        //   try {
        //     const response = await axios.post('/api/verify-payment', token);
        //     const transactionQris = response.data.result;
        //     // const fraudStatus = response.data.fraud_status;
        //     // return transactionStatus, fraudStatus;

        //     console.log(transactionQris);
        //   } catch (error) {
        //     console.error('Failed to get info:', error);
        //     return null;
        //   }
        // };
        // getInfoTransaksi(token);
        const gopayTransaction = async (newRow) => {
          try {
            const response = await axios.post('/api/verify-payment', newRow);
            const transactionQrisUrl = response.data.transactionQrisUrl;

            return transactionQrisUrl;
          } catch (error) {
            console.error('Failed to getqris_url:', error);
            return null;
          }
        };
        // gopayTransaction(newRow);
        const transactionQrisUrl = await gopayTransaction(newRow);
        console.log(transactionQrisUrl);

        const qris_url = transactionQrisUrl.actions.find(
          (action) => action.name === 'generate-qr-code'
        ).url;
        console.log(qris_url); //berhasil

        // setIsLoading(true); // set status loading menjadi true, kirim ke drive
        await appendSpreadsheet(newRow);
        e.target.reset();
        setIsButtonDisabled(false);

        router.push(
          // `https://app.sandbox.midtrans.com/snap/v3/redirection/${transactionToken}`
          {
            pathname: './checkout',
            query: {
              qris_url: qris_url,
              namalengkap: newRow.namalengkap,
              wa: newRow.wa,
              jumlah: newRow.jumlah,
              kalipembayaran: newRow.kalipembayaran,
              bulan: newRow.bulan,
              pesan: newRow.pesan,
            }, //berhasil
          }
        );
      } else {
        Swal.fire({
          title: `kode ${form.token} tidak valid,hubungi admin.`,
          text: 'Data gagal dikirim',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
        setIsButtonDisabled(false);
      }
    } else {
      setIsTokenEmpty(form.token === '');
      setIsnamalengkapEmpty(form.namalengkap === '');
      setIswaEmpty(form.wa === '');
      setIsjumlahEmpty(form.jumlah === '');
      setIsbulanEmpty(form.bulan === '');
      setIstimestampEmpty(form.timestamp === '');
      setIskalipembayaranEmpty(form.timestamp === '');
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (name === 'token' && value.length > 6) {
      setNamaKamu(true);
      const tokenData = await checkToken(value);
      // console.log(tokenData);
      if (tokenData) {
        // setIsButtonDisabled(true);

        const { namalengkap } = tokenData;
        const inputNamaLengkap = document.getElementById('inputNamaLengkap');
        const AmbilNama = tokenData
          ? [tokenData].map((row) => row.namalengkap)
          : [];
        const namaMu = AmbilNama[0];
        // console.log(namaMu);
        inputNamaLengkap.value = namaMu;
        const tampilkanNamaLengkap = document.getElementById('namaKamu');
        tampilkanNamaLengkap.innerText = namaMu;

        const tampilkanTombol = document.getElementById('tombolKirim');
        tampilkanTombol.style.display = 'block';
        setIsReadOnly(true);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Head>
        <title>Lengkapi Data</title>
        <meta name="description" content="Formulir Pendaftaran" key="desc" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      <Layout>
        <div className="flex justify-center items-center  bg-slate-100 text-gray-900">
          <form
            className="space-y-3 w-full max-w-lg mx-auto p-5 mt-20"
            onSubmit={submitForm}>
            <p className="font-semibold text-2xl text-center w-full bg-slate-500 p-2 text-slate-100">
              Lengkapi Data
            </p>
            <div>
              <input
                name="token"
                type="text"
                readOnly={isReadOnly}
                className={`w-full mb-2 ${
                  isTokenEmpty ? 'border-red-500' : 'mb-2'
                } ${isReadOnly ? 'bg-slate-200' : ''}`}
                placeholder="Masukkan Kodemu"
                autoComplete="off"
                onChange={handleChange}
                onBlur={() => {
                  if (form.token === '') {
                    setIsTokenEmpty(true);
                  } else {
                    setIsTokenEmpty(false);
                  }
                }}
              />
              {isTokenEmpty && (
                <p className="text-red-500 text-xs">Wajib diisi</p>
              )}
              <div className="flex items-center space-x-2">
                <input
                  name="namalengkap"
                  id="inputNamaLengkap"
                  type="Checkbox"
                  // checked={false}
                  onChange={handleChange}
                  className={`${isnamalengkapEmpty ? 'border-red-500' : ''}`}
                  onBlur={() => {
                    if (form.namalengkap === '') {
                      setIsnamalengkapEmpty(true);
                    } else {
                      setIsnamalengkapEmpty(false);
                    }
                  }}
                />

                <div id="namaKamu">
                  {!namaKamu ? (
                    <p className="text-slate-900">Namamu akan tampil disini</p>
                  ) : (
                    <p className="text-red-900">Your Name Invalid</p>
                  )}
                </div>
              </div>
              {isnamalengkapEmpty && (
                <p className="text-red-500 text-xs">Wajib dicentang</p>
              )}
              <p className="text-xs text-red-900 mb-2">
                Centang jika itu namamu
              </p>
              <input
                name="wa"
                type="text"
                className={`w-full ${iswaEmpty ? 'border-red-500' : 'mb-2'}`}
                onChange={handleChange}
                placeholder="isi nomor wa yang aktif"
                onBlur={() => {
                  if (form.wa === '') {
                    setIswaEmpty(true);
                  } else {
                    setIswaEmpty(false);
                  }
                }}
              />
              {iswaEmpty && (
                <p className="text-red-500 text-xs mb-2">Wajib diisi</p>
              )}
              {/* <input
                name="bulan"
                type="text"
                className="w-full mb-2 bg-slate-200"
                onChange={handleChange}
                // placeholder="pilih bulan"
                value={bulanSekarang}
                readOnly
              /> */}
              <select
                className={`w-full  ${
                  isbulanEmpty ? 'border-red-500' : 'mb-2'
                }`}
                name="bulan"
                onBlur={() => {
                  if (form.bulan === '') {
                    setIsbulanEmpty(true);
                  } else {
                    setIsbulanEmpty(false);
                  }
                }}
                onChange={handleChange}>
                <option value="">Pilih Bulan</option>
                <option value={bulanSekarang}>{bulanSekarang}</option>
                <option value="Biaya Pendaftaran">Biaya Pendaftaran</option>
              </select>
              {isbulanEmpty && (
                <p className="text-red-500 text-xs mb-2">Wajib diisi</p>
              )}

              <select
                className={`w-full  ${
                  isjumlahEmpty ? 'border-red-500' : 'mb-2'
                }`}
                name="jumlah"
                onBlur={() => {
                  if (form.jumlah === '') {
                    setIsjumlahEmpty(true);
                  } else {
                    setIsjumlahEmpty(false);
                  }
                }}
                onChange={handleChange}>
                <option value="">Pilih Nominal</option>
                <option value="175000">Rp 175.000,-</option>
                <option value="185000">Rp 185.000,-</option>
                <option value="195000">Rp 195.000,-</option>
                <option value="35000">Rp 35.000,-</option>
                <option value="40000">Rp 40.000,-</option>
                <option value="45000">Rp 45.000,-</option>
                <option value="50000">Rp 50.000,-</option>
                <option value="100000">Rp 100.000,-</option>
                <option value="150000">Rp 150.000,-</option>
              </select>
              {isjumlahEmpty && (
                <p className="text-red-500 text-xs mb-2">Wajib diisi</p>
              )}
              {/* <input
                name="jumlah"
                type="number"
                className="w-full mb-2"
                onChange={handleChange}
                placeholder="jumlah pembayaran"
              /> */}
              <div className="flex items-center space-x-2">
                <input
                  name="timestamp"
                  type="checkbox"
                  onChange={handleChange}
                  onBlur={() => {
                    if (form.timestamp === '') {
                      setIstimestampEmpty(true);
                    } else {
                      setIstimestampEmpty(false);
                    }
                  }}
                  placeholder="pilih tanggal hari ini"
                  value={timestamp}
                  className={` ${istimestampEmpty ? 'border-red-500' : ''}`}
                />

                <p className="text-xs text-red-900 mb-2">
                  Centang jika nominal sudah benar
                </p>
              </div>
              {istimestampEmpty && (
                <p className="text-red-500 text-xs mb-2">Wajib dicentang</p>
              )}
              <select
                className="w-full mb-2"
                name="kalipembayaran"
                onChange={handleChange}
                onBlur={() => {
                  if (form.kalipembayaran === '') {
                    setIskalipembayaranEmpty(true);
                  } else {
                    setIskalipembayaranEmpty(false);
                  }
                }}>
                <option value="">Pilih Jumlah Pembayaran</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              {iskalipembayaranEmpty && (
                <p className="text-red-500 text-xs mb-2">Wajib dipilih</p>
              )}

              <textarea
                className="w-full"
                placeholder="Tulis Jika Ada Pesan ke Admin"
                name="pesan"
                onChange={handleChange}></textarea>
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
                id="tombolKirim"
                disabled={isButtonDisabled}
                type="submit"
                className="hidden w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <p className="text-lg">Lanjutkan</p>
              </button>
            )}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default BayarLes;
