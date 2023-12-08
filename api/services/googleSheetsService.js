const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config();

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
console.log(process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'));

const doc = new GoogleSpreadsheet(
  '1O5KoU970ckqtfBQXWGeFKPq1dDb5NSf0btvs3Xub3fQ',
  serviceAccountAuth
);

async function accessSpreadsheet() {
  // await doc.useServiceAccountAuth({
  //   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  //   private_key: process.env.GOOGLE_PRIVATE_KEY,
  // });

  await doc.loadInfo();

  return doc;
}

module.exports = { accessSpreadsheet };
