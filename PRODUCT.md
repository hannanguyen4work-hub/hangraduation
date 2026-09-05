# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: bạn bè của Hân nhận link mời qua Zalo/Messenger, mở bằng điện thoại, cần biết giờ giấc và xác nhận RSVP đúng hẹn để Hân đón tiếp.
Secondary: gia đình và thầy cô — ít dùng link cá nhân hơn, chủ yếu xem thông tin giờ/địa điểm và liên hệ.

## Product Purpose

Thiệp mời tốt nghiệp online của Nguyễn Bảo Hân (UEH-ISB): mời khách, cho họ mọi thông tin buổi lễ, thu xác nhận tham dự + lời chúc và lưu vào Google Sheet.
Thành công = bạn bè RSVP đúng giờ, đến A.116 chụp ảnh cùng Hân, không ai lạc đường hay lỡ giờ.

## Positioning

Một link cho mỗi khách (`?to=Tên`) + form RSVP ghi thẳng vào Sheet của Hân — không dùng thiệp giấy, không form chung chung, không backend riêng.

## Operating Context

- Khách mở link riêng trên mobile, một số trên PC.
- Buổi lễ: 1:30 chiều Chủ Nhật 04/10/2026, Phòng A.116 – Cơ sở A UEH, 59C Nguyễn Đình Chiểu, TP.HCM.
- Quy trình: Hân tạo link hàng loạt ở `admin.html` → dán vào Sheet/cột link → gửi từng khách → khách mở web → điền RSVP → dữ liệu vào tab `RSVP`.
- Host tĩnh trên GitHub Pages (`hangraduation`), API duy nhất là Google Apps Script Web App.

## Capabilities and Constraints

- Confirmed: web tĩnh HTML/CSS/JS, responsive mobile/PC; cá nhân hóa tên từ `?to=`; countdown theo `config.js`; confetti + nhạc nền có nút bật/tắt; form RSVP POST về Apps Script, fallback demo local khi chưa cấu hình.
- Locked facts: ngày giờ 04/10/2026 13:30; phòng A.116 Cơ sở A; SĐT 0911 237 126; link Google Maps UEH Cơ sở A. Không đổi khi chưa có xác nhận của Hân.
- Ngôn ngữ: tiếng Việt. Không bịa thông tin lịch trường.
- Undecided: số lượng khách dự kiến; có cần sheet `Guests` theo dõi đã gửi/thu hồi hay không.

## Brand Commitments

- Tên: Nguyễn Bảo Hân · Hân Graduation · UEH-ISB.
- Tone do Hân chốt (ghi nhận nguyên văn, không mở rộng): trẻ trung, hồng/trắng/be sáng, clean, đơn giản.

## Evidence on Hand

- Real: `index.html`, `config.js` (ngày giờ, địa điểm, SĐT, Maps), `admin.html` (tạo link), `gas/Code.gs` (API Sheet), `SHEET_SETUP.md`, `GITHUB_SETUP.md`.
- Absent (không được bịa): ảnh cá nhân/album thật; file `music.mp3`; URL Apps Script thật (`googleScriptUrl` đang trống); ngày giờ là lịch Hân báo, chưa đối chiếu lịch trường.

## Product Principles

1. Khách hiểu trong 30 giây: ai mời, khi nào, ở đâu, bấm gì để xác nhận.
2. Mỗi link là một lời mời riêng — tên khách luôn đúng, RSVP luôn về đúng Sheet.
3. Mobile trước: chữ đủ to, nút đủ lớn, load nhẹ, không hiệu ứng chặn nội dung.
4. Thiếu gì nói rõ thiếu đó — không dùng ảnh/nhạc/lời chứng thực giả để lấp chỗ trống.
