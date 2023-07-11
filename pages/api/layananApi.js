import fs from "fs-extra";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const filePath = "./pages/api/layanan/programs.json";

    try {
      // Baca data JSON yang ada
      const jsonData = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(jsonData);

      // Dapatkan data baru dari body permintaan POST
      const newProgram = req.body;

      // Tambahkan data baru ke array programs
      data.programs.push(newProgram);

      // Tulis data yang diperbarui kembali ke file JSON
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

      res.status(200).json({ message: "Data added successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error adding data." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
