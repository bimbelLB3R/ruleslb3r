import fs from 'fs';

export function getBlogsData() {
  const filePath = './pages/api/blogs.json';
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  return data;
}
