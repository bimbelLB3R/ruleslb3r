import Faq from '../components/Faq';
import ImageSlide from '../components/ImageSlide';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="bg-gray-400 overflow-hidden">
      <Navbar
        logoUrl="image/logolb3r.png"
        logoAlt="Logo"
        menuItems={[
          { label: 'Sistem Pembayaran & Biaya', url: '/rules/payment' },
          { label: 'Cara Membuat Kelas Baru', url: '/rules/newclass' },
          { label: 'Aturan One Day Before', url: '/rules/odb' },
          { label: 'Ketentuan Kegiatan Belajar', url: '/rules/kbm' },
        ]}
      />
      <ImageSlide />
      <Faq />
    </div>
  );
}
