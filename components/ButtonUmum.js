import { useRouter } from "next/router";

import Swal from "sweetalert2";
const ButtonUmum = () => {
  const router = useRouter();
  const handleClick = () => {
    Swal.fire({
      title: "Welcome...",
      text: "Sudah siap jadi siswa LB3R?",
      imageUrl: "/image/image7.webp",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    router.push("/layanan");
  };
  return (
    <div className="flex justify-center md:max-w-xl m-auto bg-gradient-to-b from-cyan-100 to-orange-100 p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out "
        onClick={handleClick}
      >
        Daftar Sekarang
      </button>
    </div>
  );
};

export default ButtonUmum;
