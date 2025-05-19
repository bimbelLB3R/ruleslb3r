import Link from "next/link";
import VideoDraggable from "./Videodraggable";
const Welcome = () => {
  return (
    <div className="relative">
      {/* <div className="absolute -top-[150px] md:-top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <VideoDraggable />
      </div> */}

      <div className="flex justify-center md:max-w-xl m-auto">
        <div className="leading-tight p-4 text-gray-600 text-center">
          {/* <h2 className="mb-4 text-[52px] font-gasok font-bold">LB3R</h2> */}
          <p>
            Bimbel LB3R sudah hadir di kabupaten Tabalong sejak tahun 2012 dan telah mendampingi ribuan siswa dari jenjang TK, SD, SMP, SMA hingga ALumni. LB3R selalu mengikuti perubahan kurikulum sehingga pembelajarannya selalu up date sesuai kebutuhan kamu. Di LB3R kamu bisa membuat kelas kamu sendiri dan mengatur jadwal secara fleksibel menyesuaikan waktu antara belajar di sekolah, berorganisasi, dan belajar di bimbel sehingga kamu bisa belajar dengan efektif dan efisien. Selain waktu belajar yang fleksibel, sistem pembayaran juga mudah dan terjangkau untuk semua kalangan. Orang tua juga akan mendapatkan laporan riwayat kehadiran dan pembayaran siswa serta bisa secara langsung berdiskusi tentang perkembangan anak.
          </p>
          <br/>
          <p>Ada beberapa program di LB3R yang bertujuan untuk menambah ketrampilan anak seperti ketrampilan berbahasa asing dan koding. Selain itu, LB3R juga memberikan layanan asesmen bakat dan minat menggunakan talents mapping dan talents tracker untuk pemilihan jurusan serta pengembangan karir anak. Talents mapping dan talenta tracker juga bisa digunakan untuk mengatasi masalah kepribadian anak dan masalah-masalah lain terkait psikologis anak dalam hubungan keluarga dan sosial.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
