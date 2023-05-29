import fs from 'fs';

export function getProgramsData() {
  const filePath = './pages/api/layanan/programs.json';
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  return data;
}
