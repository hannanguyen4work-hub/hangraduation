# Đưa web lên GitHub Pages — repo `hangraduation`

Tài khoản: `hannanguyen4work-hub` → link đích: `https://hannanguyen4work-hub.github.io/hangraduation/`

## Cách 1: làm trên web GitHub (dễ nhất, 2 phút)
1. Vào https://github.com/new → Repository name: `hangraduation` → Public → **Create repository**
2. Bấm **uploading an existing file** → kéo toàn bộ file trong thư mục này lên → **Commit changes**
3. Vào tab **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main / (root)** → Save
4. Đợi 1–2 phút, mở `https://hannanguyen4work-hub.github.io/hangraduation/`

## Cách 2: đẩy từ máy (đã cài Git)
```powershell
cd D:\totnghiepinvitationweb
git init -b main
git add .
git commit -m "graduation invitation v1"
git remote add origin https://github.com/hannanguyen4work-hub/hangraduation.git
git push -u origin main
```
Lần đầu GitHub sẽ hỏi đăng nhập: dùng **Personal Access Token** (Settings → Developer settings → Tokens).
Sau đó bật Pages như Cách 1 bước 3.

## Kiểm tra responsive mobile/PC
- Web dùng 1 file `styles.css` mobile-first, breakpoint 720px.
- Test: mở link trên điện thoại + thu nhỏ trình duyệt PC, các card tự xếp 1 cột → 3 cột.
