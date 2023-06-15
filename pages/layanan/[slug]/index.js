import DaftarLayanan from "../../../components/DaftarLayanan";
import { getProgramsData } from "../../../utils/layananApi";
import { getBlogsData } from "../../../utils/blogsApi";

export default function detailProgramDiambil({ detailProgram, allPost }) {
  return (
    <>
      <DaftarLayanan detailProgram={detailProgram} allPost={allPost} />
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
  const data2 = await getBlogsData();
  const allProgram = data.programs;
  const programSlug = params.slug;
  const allPost = data2.posts;
  // Find the post with a matching id
  const detailProgram = allProgram.find(
    (program) => program.slug == programSlug
  );

  return {
    props: {
      detailProgram,
      allPost,
    },
  };
}
