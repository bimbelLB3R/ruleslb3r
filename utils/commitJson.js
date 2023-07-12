import axios from "axios";

const commitProgramsJSON = async (commitMessage, newData) => {
  try {
    // Ganti dengan token akses GitHub Anda
    const token = process.env.GITHUB_TOKEN;

    // Konfigurasi header untuk otorisasi dengan token akses
    const headers = {
      Authorization: `Basic ${token}`,
    };

    // Dapatkan konten terkini dari programs.json
    const response = await axios.get(
      "https://api.github.com/repos/bimbelLB3R/ruleslb3r/contents/pages/api/layanan/programs.json",
      { headers }
    );

    // Mendapatkan SHA terkini untuk file programs.json
    const currentSHA = response.data.sha;

    // Mengubah konten programs.json sesuai dengan data baru
    const content = Buffer.from(JSON.stringify(newData)).toString("base64");

    // Data yang akan dikirim dalam permintaan commit
    const data = {
      message: commitMessage,
      content,
      sha: currentSHA,
    };

    // Endpoint API untuk melakukan commit ke programs.json
    const apiEndpoint =
      "https://api.github.com/repos/bimbelLB3R/ruleslb3r/contents/pages/api/layanan/programs.json";

    // Ganti {owner} dan {repo} dengan pemilik dan nama repositori Anda

    // Melakukan permintaan PUT ke API GitHub untuk memperbarui programs.json
    const commitResponse = await axios.put(apiEndpoint, data, { headers });

    console.log("Commit berhasil:", commitResponse.data);
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan commit:", error);
  }
};
export default commitProgramsJSON;
