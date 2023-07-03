import fs from "fs";

// membaca data
export function getDefinisiProdi() {
  const filePath = "./pages/api/kampusApaItuProdi.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const definisiProdi = JSON.parse(jsonData);
  return definisiProdi;
}
