import fs from "fs";

export function getPengajarsData() {
  const filePath = "./pages/api/pengajar/dataPengajar.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}
