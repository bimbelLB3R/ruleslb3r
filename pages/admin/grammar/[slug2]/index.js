import { getGrammarData } from "../../../../utils/grammarApi";
import Youtube from "../../../../components/Youtube";
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
    params: { slug2: grammar.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getGrammarData();
  const allGrammar = data.grammar;
  const grammarSlug = params.slug2;
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
