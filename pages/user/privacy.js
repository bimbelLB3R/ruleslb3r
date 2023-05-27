import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';

export default function Privacy() {
  return (
    <>
      <Navbar />
      <Layout>
        <div className="flex  justify-center m-auto mt-20 p-4 max-h-screen md:max-w-2xl">
          <div>
            <div>
              <p className="text-center mb-5 font-extrabold">PRIVACY POLICY</p>
            </div>
            <div className=" flex space-x-2">
              <p>1.</p>
              <p>
                Semua data akan dijaga kerahasiaanya, baik email maupun data
                lainnya
              </p>
            </div>
            <div className=" flex space-x-2">
              <p>2.</p>
              <p>
                Data yang diisikan di formulir hanya dipakai untuk keperluan
                selama di bimbel dan tidak akan disebar luaskan ke pihak ketiga
              </p>
            </div>
            <div className=" flex space-x-2">
              <p>3.</p>
              <p>
                Data pembayaran secara on line dijamin aman karena menggunakan
                payment gateway yang terpercaya
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
