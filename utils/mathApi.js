import fs from "fs";

export function getMathData() {
  const filePath = "./pages/api/math.json";
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}
