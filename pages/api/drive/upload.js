import { google } from "googleapis";
import path from "path";
import fs from "fs";

const CLIENT_ID =
  "621018056476-iapr02uefbaddna0f26r2n5e6b9nus50.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//04x9Ip4VnFeFjCgYIARAAGAQSNwF-L9Irsm_DtBA3L9pK8DXyer8SYbUl8hDKUc7evQlpB_G9oVydoxYyl1CmhVHklo0tDiyJG3g";

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
