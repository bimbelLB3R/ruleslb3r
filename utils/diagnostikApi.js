import fs from 'fs';

export function getDiagnostikData() {
  const filePath = './pages/api/diagnostik.json';
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  return data;
}
