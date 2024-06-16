import fs from "fs";

export function getDataAlumni() {
  const filePath = "./pages/api/data_alumni/alumni2024.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}
