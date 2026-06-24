/**
 * Niyam Consulting — contact form backend (Google Apps Script).
 *
 * Receives a POST from the website contact form and appends one row to the
 * bound Google Sheet. Deploy this as a Web App (see README.md in this folder),
 * then paste the resulting /exec URL into FORM_ENDPOINT in src/App.tsx.
 *
 * The data lives entirely in a Google Sheet you own — nothing is stored by the
 * website or any third-party form service.
 */

// Header row written to a fresh sheet, in order.
var HEADERS = ['Timestamp', 'Name', 'Company', 'Email', 'Sector', 'Next step', 'Note', 'Page'];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ result: 'error', message: 'No payload' });
    }

    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write the header row once, on an empty sheet.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.firm || '',
      data.email || '',
      data.sector || '',
      data.step || '',
      data.note || '',
      data.page || '',
    ]);

    return jsonResponse({ result: 'success' });
  } catch (err) {
    return jsonResponse({ result: 'error', message: String(err) });
  }
}

// A plain GET is handy for confirming the deployment is live in a browser.
function doGet() {
  return jsonResponse({ result: 'ok', message: 'Niyam contact endpoint is live.' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
