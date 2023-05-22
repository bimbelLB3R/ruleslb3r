import fs from 'fs';

export function getTutorialData() {
  const filePath = './pages/api/tutorial.json';
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const dataTutorial = JSON.parse(jsonData);
  return dataTutorial;
}
