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
        return res.status(400).send(JSON.stringify({ error: true }));
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      //CUSTOMIZATION FROM HERE
      const opt = {
        spreadsheetId: "1J5pXl17Zm40o4LCDUGqu23rQq2mwGdfJuZTZ23MNnGY",
        range: "soalkuantitatif!A2:AE",
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
