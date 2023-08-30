import { useState } from "react";
import appendDataToSheet from "../libs/Formsiswa/postForm";

const AddDataForm = () => {
  // Buat state untuk menyimpan input dari form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fungsi yang akan dipanggil saat form dikirim
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kirim data ke Google Sheets
    await appendDataToSheet(process.env.NEXT_PUBLIC_SPREADSHEET_ID, "Sheet1", [
      name,
      email,
      message,
    ]);

    // Bersihkan input setelah data dikirim
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddDataForm;
