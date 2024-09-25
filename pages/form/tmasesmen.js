import FormTM from '../../components/FormTM';
import Head from 'next/head';
import { getProgramsData } from '../../utils/layananApi';

export async function getStaticProps() {
    const data = await getProgramsData();
    const allProgram = data.programs;
    // Find the post with a matching id
    const detailProgram = allProgram.find(
      (program) => program.keterangan === 'diskon'
    );
  
    return {
      props: {
        detailProgram
      },
    };
  }

const tmasesmen = ({detailProgram}) => {
  return (
    <div>
      <Head>
        <title>Formulir Asesmen Talents Mapping | Bimbel LB3R</title>
        <meta
          name="description"
          content="Sebelum mengisi asesmen talents mapping siswa wajib mengisi form persepsi dan minat personal ini."
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="image/logolb3r.png"
        />
      </Head>
      <FormTM detailProgram={detailProgram}/>
    </div>
  );
};

export default tmasesmen;
