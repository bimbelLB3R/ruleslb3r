import Image from "next/image";
import { getMathData } from "../../utils/mathApi";
import AccordianMath from "../../components/AccordianMath";

export async function getStaticProps() {
  const data = getMathData();
  return {
    props: {
      allMath: data.math,
    },
  };
}

export default function index({ allMath }) {
  // console.log(allGrammar);
  return (
    <div className="p-4 sm:p-0 w-full md:max-w-xl sm:flex sm:items-center sm:justify-center sm:m-auto">
      <div>
        <div className="flex items-center justify-center">
          <Image
            src="/image/image4.webp"
            width={300}
            height={300}
            alt="math"
            priority={true}
            className=""
          />
        </div>

        <div className="">
          <AccordianMath allMath={allMath} />
        </div>
      </div>
    </div>
  );
}
