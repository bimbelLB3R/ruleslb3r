import FormTM from '../../components/FormTM';
import Head from 'next/head';
import { getProgramsData } from '../../utils/layananApi';

export async function getStaticProps() {
    const data = await getProgramsData();
    const allProgram = data.programs;
    // Find the post with a matching id
    const detailProgram = allProgram.find(
      (program) => program.keterangan === 'tma'
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
          content="Isi dan lengkapi setiap pertanyaan di bawah ini sebagai bagian penting dari proses Assessment Talents Mapping yang dilaksanakan untuk membantu anda menyusun rencana pendidikan dan karier"
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
