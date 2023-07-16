import { google } from "googleapis-common";
// import { google } from "googleapis";
import path from "path";
import fs from "fs-extra";

const ClientId = process.env.DRIVE_CLIENT_ID;
const ClientSecret = process.env.DRIVE_CLIENT_SECRET;
const RedirectURI = process.env.REDIRECT_URI;
const RefreshToken = process.env.REFRESH_TOKEN;

async function uploadToDrive() {
  const oauth2Client = new google.auth.OAuth2(
    ClientId,
    ClientSecret,
    RedirectURI
  );

  oauth2Client.setCredentials({ refresh_token: RefreshToken });
  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });
  const filePath = path.join(__dirname, "code.jpg");
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "code.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}
uploadToDrive();
