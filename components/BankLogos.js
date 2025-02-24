import Image from "next/image";

const bankLogos = [
  "/image/logos/mandiri.png",
  "/image/logos/bni.png",
  "/image/logos/bri.png",
  "/image/logos/permata.png",
  "/image/logos/qris.png",
  "/image/logos/gopay.png",
  "/image/logos/ovo.png",
  "/image/logos/dana.png",
  "/image/logos/linkaja.png",
];

const BankLogos = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {bankLogos.map((logo, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={logo}
              alt={`Bank Logo ${index + 1}`}
              width={80} // Sesuaikan ukuran
              height={40}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankLogos;
