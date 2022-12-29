const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DB_NAME,
  },
});

export default knex;

//untuk production, simpan data credential diatas di .env supaya aman
//gunakan knex untuk koneksi ke database mysql
//npm install knex mysql
//knex bukan bersifat global, dia berada di node module. sehingga perlu dibuat alias di package.json supaya npm yang mencari file knex di nodemodule
//Menjalankan knex
//npm run knex init untuk membuat knexfile.js
// atur koneksi di knexfile development
//baru buat migrasi npm run knex migrate:make create_posts_table
//membuat schema data table di tabel migration
// migrate data npm run knex migrate:latest
// buat data (post data) ke database dengan membuat create.js
//async await berguna untuk menunggu data selesai,baru ke script berikutnya.
//cek create.js dengan insomnia atau langsung dibrowser http://localhost:3000/api/posts/create

// JWT Token
// membuat scema database user
// npm run knex migrate:make create_users_table
// atur scema tabel di file migrasinya
// npm run knex migrate:latest

// install jwt
// npm add jsonwebtoken bcryptjs
// buat folder auth, file register.js

// membuat file login.js

// membatasi akses ke post dengan token
// token dimasukkan kedalam header insomnia
// membuat middleware di file post,index.js
//membuat file middle ware yang bisa dipakai dmn aja, tdk hanya diindex.
// membuat folder middleware

// implementasi authorization ke crud dengan import authorization serta menambah const auth

// menyimpan token ke dalam cookie browser dengan bantuan library jscookie npm add js-cookie

//menggunakan useeffect di login.js untuk lifecycle
// menginstall next-cookie npm install --save next-cookies

//cookie dapat dihapus di inspect-storage
//membuat authorisasi halaman
