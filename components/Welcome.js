import Link from "next/link";
import VideoDraggable from "./Videodraggable";
const Welcome = () => {
  return (
    <div className="relative">
      <div className="absolute -top-[150px] md:-top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <VideoDraggable />
      </div>

      <div className="flex justify-center md:max-w-xl m-auto">
        <div className="leading-tight p-4 text-gray-600 text-center">
          {/* <h2 className="mb-4 text-[52px] font-gasok font-bold">LB3R</h2> */}
          <p>
            Makin kamu banyak kegiatan di sekolah, makin perlu kamu ikut
            bimbingan belajar supaya bisa mengejar ketertinggalan materi. Kamu
            tetap bisa eksis di organisasi sekolah dan kamu tetap berprestasi
            secara akademik. Di Bimbel LB3R, kamu bisa lebih mudah mengatur
            jadwal sesuai kebutuhan kamu, apalagi sebagai organisatoris. Ingat
            ya, nilai raport sangat penting untuk mengikuti seleksi masuk kuliah
            jalur Tanpa Tes (SNBP). Enak lho kalau kamu bisa lolos jalur ini,
            tidak perlu pusing belajar lagi untuk tes SNBT.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
