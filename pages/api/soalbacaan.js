import { google } from "googleapis";

// import keys from "./key";
// import dotenv from 'dotenv';
// dotenv.config();
// const clientEmail = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
// const privateKey = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

// const keys = {
//   client_email: clientEmail,
//   private_key: privateKey,
// };
// console.log(clientEmail);
// const keys = {
//   client_email: "datasiswa@bimbel-lb3r.iam.gserviceaccount.com",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVwrWOZd7b3izK\ntZRmT7xNhBmqaUwp+5rF+fsXZT/k8uH4dvsopPnwx8PWEexnzIsMFrSjgvUGRJFo\nD5g5Ic1X++EPT8reu3T+4j0kcKr4LTkSEeVpfA5JyQdFa4r7zLjiVGt1XzvgIxYt\nOTg/h81Y6UVh2q/98UtlUIBKxl6HOvf/woh64M9AUuG27rnQMb/4/GjE6KMivCXI\nBK5ZgCKSMkHUYig53a9YvuEKw+tCJM3ZZUdp8s73FeCMD2bbS+IlqsVFPxbIyA2s\nuxLvj1BV87OFVl9JuUhW7SIQcLnN4i/Ru/4OZMhA5KcER/9EbQDFFWRE0b6wsZ6X\n8kh+yz5XAgMBAAECggEABAbLabfEh2q7eEQMXBMDbohe/WVHYIETTMhlMO8g0Xy7\nwfTnzT+yT5VLvJQQ2nGxatRgqbXVTL1s6cNlcCoRVqdxeVrc7O4mCYkUcsPGjK85\nZHw+0IpcMIqfXvDkKNMV5nmFnqvhEltG1yo9Q4EY3qRiQLIgX420iF+IUyBCdpSe\nbzJDc84odPqLm5u+g3d6hRrhBhUnIG9NGPzxOwZeHgo/F+SiPoadlc5+chPS/NGU\nuIBG80eGPr0N+T3pATDmaxZofg3djVJD05RXFQnfQABzC1kRvC70KVhle/RJLER6\n6c1QGK6/dwGvgm5J43129sYUltgRkfyRF4IIuTx/uQKBgQD/vKrbhh9ZHXdVXhZO\nPhQZxhBzgygg+6ZKD4gVT8G4s6+BtxyCHdqXKoYK7XeF00aUIlza1OVpaFFNpW4a\nm4TldnOIIVajC4GGKIQwbGbBFuaoevw2BFzArTvwqeHjZ8ySEOLQFR/pYznSG8Ow\ngCSJfEdB9IMUDQVbY5MiY2yoqQKBgQDV+v1pi82Jzt8oxuL4iiI20rjq//qHbCev\nfZW/gyOvW5V9al38jNnogFMeyIgAhGulAz4KLDs4gOpgCI80lnpxv4fJOjrcNz9y\ntTkh47MGGKVZDdqcT0avNXLPPcDkLYtDEtEc+F4+NDazSjsKEam7kFbR+RMrMrsS\nxJKHaWYO/wKBgQDXFoddOuECwpWrZwa7p9qgEsWjYZxOoViq0YVS51G3Vuk14BxK\nE3HV0h4K8s6j755c2MngA08v6Fz5QTnphwOvOoDQ7blASF0XyNvlHkcN/4TgDxAx\nHlokc48GStuBt7uG3kzlVd8RHDN1U4Sy3hPcznngLxZPtuPaiVUmhxjMgQKBgQDB\nPoRxN1KOLAeZWdRMxOMVQ8TAZiCpAGHuuKnuZM5rZXhh5RewJrv8nzdxy4QXg397\nbKwwn7Vz1+jShahew68c3u4QKshRbIueWk+YbXyV+tgIztwo4ediABEJXCnBZ+gm\n0O2NDjh+UMU9scIT29O/kiD2S8yl7JDJ6EC0jdkfnQKBgGgpYpimQwTUmQHtfH1l\ny1w4+uuA+yN/Jn6rEakt4AEQJamJcAM7/BU2c9yb/WtDoc8utjIr85GT3S6J2Yf0\nlZ9mminaKsE1PkzsyEaM9tr3uBpKQZKxz3i2Xam2M9QXfAaEgEWO+NoAKNf+y/lL\nxiAvHuhTtwRbFADc+5h0PvZ8\n-----END PRIVATE KEY-----\n",
// };
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
        range: "soalbacaan!A2:AE",
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
