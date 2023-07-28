import fs from "fs";

export function getGrammarData() {
  const filePath = "./pages/api/grammar.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}
