import { useRouter } from "next/router";
import Youtube from "../../../components/Youtube";
import { getMathData } from "../../../utils/mathApi";

export default function Detail({ detailMath, allMath }) {
  const router = useRouter();
  const bab = router.query.bab;
  const idMath = router.query.id;
  return (
    <div className="flex items-center justify-center m-auto ">
      <div>
        <div className="shadow-2xl p-4">
          <Youtube
            videoId={detailMath.videoId}
            bab={bab}
            allMath={allMath}
            id={idMath}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await getMathData();
  const allMath = data.math;

  const paths = allMath.map((math) => ({
    params: { slug: math.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getMathData();
  const allMath = data.math;
  const mathSlug = params.slug;
  // Find the post with a matching id
  const detailMath = allMath.find((math) => math.slug == mathSlug);

  return {
    props: {
      detailMath,
      allMath,
    },
  };
}
