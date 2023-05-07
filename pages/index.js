import Faq from '../components/Faq';
import Layout from '../components/Layout';
import ImageSlide from '../components/ImageSlide';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Wa from '../components/Wa';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Meta />
      <Wa />
      <Navbar
        logoUrl="/image/logolb3r.png"
        logoAlt="Logo"
        // menuItems={[
        //   { label: 'Sistem Pembayaran & Biaya', url: '/rules/payment' },
        //   { label: 'Cara Membuat Kelas Baru', url: '/rules/newclass' },
        //   { label: 'Aturan One Day Before', url: '/rules/odb' },
        //   { label: 'Ketentuan Kegiatan Belajar', url: '/rules/kbm' },
        //   { label: 'Ketentuan Berhenti Belajar', url: '/rules/off' },
        //   {
        //     label: 'MULAI SNBT',
        //     url: '/form/newmember',
        //   },
        // ]}
      />
      <Layout>
        <ImageSlide />
        <Faq />
      </Layout>
    </div>
  );
}
