import fs from "fs";

export function getPraktisiData() {
  const filePath = "./pages/api/pengajar/dataPraktisi.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}
