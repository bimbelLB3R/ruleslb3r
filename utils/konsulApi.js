import fs from "fs";

export function getKonsulData() {
  const filePath = "./pages/api/konsul.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}
