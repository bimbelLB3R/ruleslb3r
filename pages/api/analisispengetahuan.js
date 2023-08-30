import { google } from "googleapis";

// import keys from "./key";
export default function handler(req, res) {
  const emailClient = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
  const keyPrivat = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;
  try {
    const client = new google.auth.JWT(
      emailClient,
      // process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
      null,
      keyPrivat,
      // process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    // console.log(keys);

    client.authorize(async function (err, tokens) {
      if (err) {
        return res.status(400).send({ error: true });
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      //CUSTOMIZATION FROM HERE
      const opt = {
        spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
        range: "analisispengetahuan!A11:AC900",
      };

      let data = await gsapi.spreadsheets.values.get(opt);
      return res.status(400).send(
        JSON.stringify({
          error: false,
          data: data.data.values,
        })
      );
    });
  } catch (e) {
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
