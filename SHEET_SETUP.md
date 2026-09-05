# Google Sheet + RSVP — làm 5 phút

Mục tiêu: khách điền form trên web → tự ghi vào Google Sheet. Mỗi khách có link riêng `?to=Ten`.

## Bước 1: Tạo Sheet
1. Vào https://sheets.new → đặt tên `Hân Graduation - RSVP`
2. Tab đầu đổi tên thành `RSVP`, dòng 1 ghi 7 cột:
   `Thoi gian | Ten | Tham du | So nguoi | Loi chuc | Link khach | Page URL`
3. (Tùy chọn) Tạo tab `Guests` với 2 cột: `Ten khach | Link ca nhan` — dùng để dán link từ trang `admin.html`.

## Bước 2: Dán Apps Script
1. Trong Sheet: **Extensions → Apps Script**
2. Xóa code mẫu, copy toàn bộ file `gas/Code.gs` trong repo này dán vào, bấm Save (💾).
3. Bấm **Run → doGet** lần đầu → cấp quyền (Continue → chọn Gmail → Allow).

## Bước 3: Deploy thành Web App
1. Trong Apps Script: **Deploy → New deployment**
2. Type: **Web app**
3. `Execute as`: **Me** · `Who has access`: **Anyone**
4. Bấm **Deploy** → copy **Web app URL** (dạng `https://script.google.com/macros/s/.../exec`)

## Bước 4: Gắn URL vào web
Mở `config.js`, dán URL vào:
```js
googleScriptUrl: "https://script.google.com/macros/s/.../exec",
```
Commit + push → xong. Test bằng cách tự điền form, kiểm tra tab `RSVP` có dòng mới.

## Tạo link cá nhân hàng loạt
1. Mở `https://hannanguyen4work-hub.github.io/hangraduation/admin.html`
2. Dán danh sách tên → **Tạo link** → **Tải CSV** hoặc copy từng link.
3. Dán vào tab `Guests` / gửi riêng cho từng khách qua Zalo.
