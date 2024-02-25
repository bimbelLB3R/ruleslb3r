import Link from "next/link";
import VideoDraggable from "./Videodraggable";
const Welcome = () => {
  return (
    <div className="relative">
      <div className="absolute -top-[150px] md:-top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* <VideoDraggable /> */}
      </div>

      <div className="flex justify-center md:max-w-xl m-auto">
        <div className="leading-tight p-4 text-orange-900/80 text-center">
          {/* <h2 className="mb-4 text-[52px] font-gasok font-bold">LB3R</h2> */}
          <p>
            Bimbingan belajar (Bimbel)/tempat les ternama di Kabupaten Tabalong
            yang didirikan sejak tahun 2012. Bimbel LB3R berpengalaman dalam
            mendampingi kebutuhan belajar anak mulai jenjang SD/MI, SMP/Mts,
            SMA/MA/SMK hingga Alumni. Keunggulan Bimbel LB3R diantaranya{" "}
            <Link href="/rules/payment">
              <span className=" text-blue-600">sistem pembayaran</span>
            </Link>{" "}
            yang mudah dan{" "}
            <Link href="/rules/newclass">
              <span className=" text-blue-600">fleksibilitas kelas </span>
            </Link>
            . Selain itu,{" "}
            <Link href="/rules/kbm">
              <span className=" text-blue-600">sistem pembelajaran </span>
            </Link>{" "}
            di Bimbel LB3R menyesuaikan dengan kebutuhan anak.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
