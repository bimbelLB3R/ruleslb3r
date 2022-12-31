import { GoogleSpreadsheet } from 'google-spreadsheet';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

// GoogleSpreadsheet Initialize
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

// Append Function
const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};

const submitForm = (e) => {
  e.preventDefault();

  if (
    form.name !== '' &&
    form.email !== '' &&
    form.topic !== '' &&
    form.description !== ''
  ) {
    // Data add for append
    const newRow = {
      FullName: form.name,
      Email: form.email,
      Topic: form.topic,
      Description: form.description,
    };

    appendSpreadsheet(newRow);
  }
};
