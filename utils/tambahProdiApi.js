import fs from "fs";

// membaca data
export function getKampusesData() {
  const filePath = "./pages/api/kampus.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const dataKampus = JSON.parse(jsonData);
  return dataKampus;
}
