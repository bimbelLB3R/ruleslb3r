import fs from "fs";

// membaca data
export function getModalitasData() {
  const filePath = "./pages/api/modalitas.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const dataKampus = JSON.parse(jsonData);
  return dataKampus;
}
