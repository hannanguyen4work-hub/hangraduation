/** Code.gs — paste toàn bộ vào Google Apps Script, làm theo SHEET_SETUP.md
 * Sheet cần 2 tab: "RSVP" và "Guests" (tạo header tự động nếu chưa có).
 * Deploy: Deploy > New deployment > Web app > Execute as: Me, Access: Anyone.
 */

function ensureSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
  } else if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
  }
  return sh;
}

function doGet() {
  ensureSheet("RSVP", ["Thoi gian", "Ten", "Tham du", "So nguoi", "Loi chuc", "Link khach", "Page URL"]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true, msg: "Hân Graduation API OK" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sh = ensureSheet("RSVP", ["Thoi gian", "Ten", "Tham du", "So nguoi", "Loi chuc", "Link khach", "Page URL"]);
    let d = {};
    try { d = JSON.parse(e.postData.contents); } catch (err) { d = e.parameter || {}; }
    sh.appendRow([
      new Date(),
      d.name || "",
      d.attend || "",
      d.count || 1,
      d.wish || "",
      d.guestParam || "",
      d.pageUrl || "",
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
