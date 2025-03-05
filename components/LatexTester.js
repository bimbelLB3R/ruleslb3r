import { useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function LatexTester() {
  const [latex, setLatex] = useState("E = mc^2");

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <textarea
        placeholder="Masukkan kode LaTeX..."
        value={latex}
        onChange={(e) => setLatex(e.target.value)}
        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
      />
      <div className="bg-white shadow-md rounded-lg p-4 text-center border border-gray-200">
        <BlockMath>{latex}</BlockMath>
      </div>
    </div>
  );
}
