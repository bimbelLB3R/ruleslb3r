import DaftarLayanan from "../../../components/DaftarLayanan";
import { getProgramsData } from "../../../utils/layananApi";

export default function detailProgramDiambil({ detailProgram }) {
  return (
    <>
      <DaftarLayanan detailProgram={detailProgram} />
    </>
  );
}

export async function getStaticPaths() {
  const data = await getProgramsData();
  const allProgram = data.programs;

  const paths = allProgram.map((program) => ({
    params: { slug: program.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getProgramsData();
  const allProgram = data.programs;
  const programSlug = params.slug;
  // Find the post with a matching id
  const detailProgram = allProgram.find(
    (program) => program.slug == programSlug
  );

  return {
    props: {
      detailProgram,
    },
  };
}
