import { google } from "googleapis";
import path from "path";
import fs from "fs";

const CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export default async function uploadFile(req, res) {
  const filePath = path.join(process.cwd(), "public/image/assets/code.jpg");

  try {
    const response = await drive.files.create({
      requestBody: {
        name: "code.jpg", // This can be name of your choice
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to upload file" });
  }
}
