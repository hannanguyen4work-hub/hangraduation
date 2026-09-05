/* CẤU HÌNH DUY NHẤT BẠN CẦN SỬA */
const CONFIG = {
  // --- Thông tin chính ---
  graduateName: "Nguyễn Bảo Hân",
  school: "UEH-ISB · Viện Tài năng – Đại học UEH",
  major: "Cử nhân UEH-ISB",
  // Ngày giờ: bạn sửa lại cho đúng lịch thật. Định dạng ISO để countdown chạy.
  // VD: "2026-11-15T08:00:00+07:00"
  eventDateISO: "2026-10-04T13:30:00+07:00",
  eventDateText: "1:30 Chiều · Chủ Nhật, 04/10/2026",
  room: "Phòng A.116 – Cơ sở A, UEH",
  address: "59C Nguyễn Đình Chiểu, P. Xuân Hòa, TP. Hồ Chí Minh",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=UEH+C%C6%A1+s%E1%BB%9F+A+59C+Nguy%E1%BB%85n+%C4%90%C3%ACnh+Chi%E1%BB%83u",
  phone: "0911237126",
  phoneHref: "tel:+84911237126",
  zaloUrl: "https://zalo.me/0911237126",

  // --- Link gốc (sau khi bật GitHub Pages thì đúng luôn, không cần sửa) ---
  baseUrl: "https://hannanguyen4work-hub.github.io/hangraduation/",

  // --- Google Apps Script Web App URL ---
  // Để trống thì form RSVP vẫn chạy ở chế độ demo (lưu local + hiện thông báo).
  // Khi đã làm theo SHEET_SETUP.md, paste URL vào đây, VD:
  // "https://script.google.com/macros/s/AKfyc.../exec"
  googleScriptUrl: "",

  heroNote: "Sự hiện diện của bạn là món quà lớn nhất!",
};
