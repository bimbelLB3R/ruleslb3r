import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Baca file blog.json dari direktori api
    const filePath = path.join(process.cwd(), "pages", "api", "blogs.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const blogData = JSON.parse(jsonData);

    // Kirim balik respons dengan data blog sebagai JSON
    res.status(200).json(blogData);
  } catch (error) {
    console.error("Error reading blog data:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat membaca data blog." });
  }
}
