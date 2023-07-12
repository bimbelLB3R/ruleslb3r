import axios from "axios";

const commitProgramsJSON = async (commitMessage, newData2) => {
  //   console.log(newData2);
  //   // console.log(commitMessage);
  //   try {
  //     // Ganti dengan token akses GitHub Anda
  //     const token = process.env.GITHUB_TOKEN;

  //     // Konfigurasi header untuk otorisasi dengan token akses
  //     const headers = {
  //       Authorization: `Basic ${token}`,
  //     };

  //     // Dapatkan konten terkini dari programs.json
  //     const response = await axios.get(
  //       "https://api.github.com/repos/bimbelLB3R/ruleslb3r/contents/pages/api/layanan/programs.json",
  //       { headers }
  //     );
  //     // console.log(response);
  //     // Mendapatkan SHA terkini untuk file programs.json
  //     const currentSHA = response.data.sha;

  //     // Mengubah konten programs.json sesuai dengan data baru
  //     const content = Buffer.from(JSON.stringify(newData2)).toString("base64");

  //     // Data yang akan dikirim dalam permintaan commit
  //     const data = {
  //       message: commitMessage,
  //       content,
  //       sha: currentSHA,
  //     };

  //     // Endpoint API untuk melakukan commit ke programs.json
  //     const apiEndpoint =
  //       "https://api.github.com/repos/bimbelLB3R/ruleslb3r/contents/pages/api/layanan/programs.json";

  //     // Ganti {owner} dan {repo} dengan pemilik dan nama repositori Anda

  //     // Melakukan permintaan PUT ke API GitHub untuk memperbarui programs.json
  //     const commitResponse = await axios.put(apiEndpoint, data, { headers });

  //     console.log("Commit berhasil:", commitResponse.data);
  //   } catch (error) {
  //     console.error("Terjadi kesalahan saat melakukan commit:", error);
  //   }
  // };

  console.log(newData2);
  try {
    // Ganti dengan token akses GitHub Anda
    const token = process.env.GITHUB_TOKEN;

    // Konfigurasi header untuk otorisasi dengan token akses
    const headers = {
      Authorization: `Basic ${token}`,
    };

    // Dapatkan konten terkini dari programs.json
    const response = await fetch(
      "https://api.github.com/repos/bimbelLB3R/ruleslb3r/contents/pages/api/layanan/programs.json",
      { headers }
    );
    const data = await response.json();
    const currentSHA = data.sha;
    // console.log(currentSHA);

    // Mengubah konten programs.json sesuai dengan data baru
    const content = Buffer.from(JSON.stringify(newData2)).toString("base64");
    // console.log(content);
    // Data yang akan dikirim dalam permintaan commit
    const requestData = {
      message: commitMessage,
      content,
      sha: currentSHA,
    };
    // console.log(requestData);
    // Endpoint API untuk melakukan commit ke programs.json
    const apiEndpoint =
      "https://api.github.com/repos/bimbelLB3R/ruleslb3r/contents/pages/api/layanan/programs.json";

    // Melakukan permintaan PUT ke API GitHub untuk memperbarui programs.json
    const commitResponse = await fetch(apiEndpoint, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(requestData),
    });

    console.log(commitResponse);

    const commitData = await commitResponse.json();
    console.log("Commit berhasil:", commitData);
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan commit:", error);
  }
};
export default commitProgramsJSON;
