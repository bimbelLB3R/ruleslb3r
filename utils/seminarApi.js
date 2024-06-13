import fs from "fs";

export function getSeminarData() {
  const filePath = "./pages/api/seminar.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}
