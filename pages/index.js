// import Faq from '../components/Faq';
// import Layout from '../components/Layout';
// import ImageSlide from '../components/ImageSlide';
// import Meta from '../components/Meta';
// import Navbar from '../components/Navbar';
// import Wa from '../components/Wa';
import dynamic from 'next/dynamic';

export default function Home() {
  const DynamicFaq = dynamic(() => import('../components/Faq'), {
    loading: () => <p>Loading...</p>,
  });
  const DynamicMeta = dynamic(() => import('../components/Meta'), {
    loading: () => <p>Loading...</p>,
  });
  const DynamicNavbar = dynamic(() => import('../components/Navbar'), {
    loading: () => <p>Loading...</p>,
  });
  const DynamicImageSlide = dynamic(() => import('../components/ImageSlide'), {
    loading: () => <p>Loading...</p>,
  });
  const DynamicLayout = dynamic(() => import('../components/Layout'), {
    loading: () => <p>Loading...</p>,
  });
  return (
    <div className="overflow-hidden">
      <DynamicMeta />
      {/* <Wa /> */}
      <DynamicNavbar
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
      <DynamicLayout>
        <DynamicImageSlide />
        <DynamicFaq />
      </DynamicLayout>
    </div>
  );
}
