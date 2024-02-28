export async function fetchDataVercel() {
  try {
    const response = await fetch("https://ruleslb3r.vercel.app/api/endpoint");
    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
