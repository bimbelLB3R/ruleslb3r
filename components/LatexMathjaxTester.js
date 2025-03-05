import { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function LatexMathjaxTester() {
  const [latex, setLatex] = useState(String.raw`\begin{array}{|c|c|c|} \hline Nama & Usia & Kota \\ \hline Alice & 25 & Jakarta \\ Bob & 30 & Bandung \\ Charlie & 28 & Surabaya \\ \hline \end{array}`);

  return (
    <MathJaxContext>
      <div className="p-6 max-w-lg mx-auto space-y-4">
        <textarea
          placeholder="Masukkan kode LaTeX..."
          value={latex}
          onChange={(e) => setLatex(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        />
        <div className="bg-white shadow-md rounded-lg p-4 text-center border border-gray-200">
          <MathJax>{`\\( ${latex} \\)`}</MathJax>
        </div>
      </div>
    </MathJaxContext>
  );
}
