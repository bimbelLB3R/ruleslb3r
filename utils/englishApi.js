import fs from "fs";

export function getEnglishData() {
  const filePath = "./pages/api/english.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}
