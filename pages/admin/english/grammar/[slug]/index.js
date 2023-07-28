import Youtube from "../../../../../components/Youtube";
import {
  getEnglishData,
  getGrammarData,
} from "../../../../../utils/englishApi";

export default function Detail({ detailGrammar, allGrammar }) {
  return (
    <div className="flex items-center justify-center m-auto">
      <div>
        <div className="">
          <Youtube videoId={detailGrammar.videoId} />
        </div>

        <div>
          <h1>{detailGrammar.title}</h1>
        </div>
      </div>
    </div>
  );
}
export async function getStaticPaths() {
  const data = await getGrammarData();
  const allGrammar = data.grammar;

  const paths = allGrammar.map((grammar) => ({
    params: { slug: grammar.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getEnglishData();
  const allGrammar = data.grammar;
  const grammarSlug = params.slug;
  // Find the post with a matching id
  const detailGrammar = allGrammar.find(
    (grammar) => grammar.slug == grammarSlug
  );

  return {
    props: {
      detailGrammar,
      allGrammar,
    },
  };
}
